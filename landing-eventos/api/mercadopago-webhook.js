const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";
const MERCADOPAGO_MERCHANT_ORDERS_URL = "https://api.mercadopago.com/merchant_orders";

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const parseBody = (req) => {
  if (!req.body) return {};
  return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
};

const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  return {
    url: url.replace(/\/$/, ""),
    key
  };
};

const supabaseRequest = async (path, options = {}) => {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || "Error consultando Supabase.");
  }

  return data;
};

const normalizeStatus = (status) => {
  const statusMap = {
    approved: "approved",
    pending: "pending",
    in_process: "pending",
    in_mediation: "pending",
    rejected: "rejected",
    cancelled: "cancelled",
    refunded: "refunded",
    charged_back: "refunded"
  };

  return statusMap[status] || "unknown";
};

const getPaymentId = (query, body) =>
  query?.["data.id"] ||
  query?.id ||
  body?.data?.id ||
  body?.resource?.split("/").pop() ||
  body?.id;

const getNotificationType = (query, body) =>
  query?.type || query?.topic || body?.type || body?.topic || "";

const getMerchantOrderId = (query, body) =>
  query?.id ||
  body?.resource?.split("/").pop() ||
  body?.id;

const isSupportedNotification = (query, body) => {
  const type = query?.type || query?.topic || body?.type || body?.topic || "";
  return !type || type === "payment" || type === "merchant_order";
};

const fetchMercadoPagoJson = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No fue posible consultar Mercado Pago.");
  }

  return data;
};

module.exports = async function handler(req, res) {
  if (!["POST", "GET"].includes(req.method)) {
    res.setHeader("Allow", "POST, GET");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return sendJson(res, 500, { error: "Falta configurar MERCADOPAGO_ACCESS_TOKEN." });
  }

  let body = {};

  try {
    body = parseBody(req);
  } catch (error) {
    return sendJson(res, 400, { error: "JSON inválido." });
  }

  if (!isSupportedNotification(req.query, body)) {
    console.log("[Mercado Pago webhook] ignored unsupported notification", {
      type: getNotificationType(req.query, body)
    });
    return sendJson(res, 200, { ok: true, ignored: true });
  }

  const notificationType = getNotificationType(req.query, body);

  try {
    let paymentIds = [];

    if (!notificationType || notificationType === "payment") {
      const paymentId = getPaymentId(req.query, body);
      if (paymentId) paymentIds.push(paymentId);
    }

    if (notificationType === "merchant_order") {
      const merchantOrderId = getMerchantOrderId(req.query, body);

      if (merchantOrderId) {
        const merchantOrder = await fetchMercadoPagoJson(
          `${MERCADOPAGO_MERCHANT_ORDERS_URL}/${merchantOrderId}`,
          accessToken
        );

        paymentIds = (merchantOrder.payments || [])
          .map((payment) => payment.id)
          .filter(Boolean);

        console.log("[Mercado Pago webhook] merchant_order received", {
          merchant_order_id: String(merchantOrderId),
          payment_ids: paymentIds.map(String),
          status: merchantOrder.status || null
        });
      }
    }

    if (!paymentIds.length) {
      console.log("[Mercado Pago webhook] ignored without payment_id", {
        type: notificationType || null
      });
      return sendJson(res, 200, { ok: true, ignored: true, reason: "Sin payment_id" });
    }

    const updates = [];

    for (const paymentId of paymentIds) {
      const payment = await fetchMercadoPagoJson(`${MERCADOPAGO_PAYMENTS_URL}/${paymentId}`, accessToken);
      const externalReference = payment.external_reference || payment.metadata?.external_reference;

      if (!externalReference) {
        console.log("[Mercado Pago webhook] ignored payment without external_reference", {
          payment_id: String(payment.id || paymentId),
          status: payment.status || null,
          status_detail: payment.status_detail || null
        });
        continue;
      }

      const updatePayload = {
        payment_id: String(payment.id || paymentId),
        payment_status: normalizeStatus(payment.status),
        payment_status_detail: payment.status_detail || null,
        payment_method: payment.payment_method_id || null,
        date_approved: payment.date_approved || null,
        raw_payment: payment,
        updated_at: new Date().toISOString()
      };

      if (payment.payer?.email) {
        updatePayload.buyer_email = payment.payer.email;
      }

      const payerName = [payment.payer?.first_name, payment.payer?.last_name].filter(Boolean).join(" ").trim();
      const payerPhone = payment.payer?.phone?.number || payment.additional_info?.payer?.phone?.number;

      if (payerName) {
        updatePayload.buyer_name = payerName;
      }

      if (payerPhone) {
        updatePayload.buyer_phone = String(payerPhone);
      }

      if (payment.transaction_amount || payment.transaction_details?.total_paid_amount) {
        updatePayload.total_amount = payment.transaction_amount || payment.transaction_details.total_paid_amount;
      }

      await supabaseRequest(`ticket_orders?external_reference=eq.${encodeURIComponent(externalReference)}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal"
        },
        body: JSON.stringify(updatePayload)
      });

      console.log("[Mercado Pago webhook] payment updated", {
        payment_id: String(payment.id || paymentId),
        external_reference: externalReference,
        status: payment.status || null,
        status_detail: payment.status_detail || null
      });

      updates.push({
        payment_id: String(payment.id || paymentId),
        status: normalizeStatus(payment.status),
        external_reference: externalReference
      });
    }

    return sendJson(res, 200, {
      ok: true,
      updates
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Error procesando webhook." });
  }
};
