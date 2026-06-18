const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

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

const isPaymentNotification = (query, body) => {
  const type = query?.type || query?.topic || body?.type || body?.topic || "";
  return !type || type === "payment";
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

  if (!isPaymentNotification(req.query, body)) {
    return sendJson(res, 200, { ok: true, ignored: true });
  }

  const paymentId = getPaymentId(req.query, body);

  if (!paymentId) {
    return sendJson(res, 200, { ok: true, ignored: true });
  }

  try {
    const paymentResponse = await fetch(`${MERCADOPAGO_PAYMENTS_URL}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const payment = await paymentResponse.json();

    if (!paymentResponse.ok) {
      return sendJson(res, paymentResponse.status, {
        error: payment.message || "No fue posible consultar el pago."
      });
    }

    const externalReference = payment.external_reference || payment.metadata?.external_reference;

    if (!externalReference) {
      return sendJson(res, 200, { ok: true, ignored: true, reason: "Sin external_reference" });
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

    return sendJson(res, 200, {
      ok: true,
      payment_id: String(payment.id || paymentId),
      status: normalizeStatus(payment.status),
      external_reference: externalReference
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Error procesando webhook." });
  }
};
