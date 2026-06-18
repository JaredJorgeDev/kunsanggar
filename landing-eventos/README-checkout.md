# Checkout Pro + Supabase

## Archivos

Modificados:
- `index.html`
- `script.js`
- `styles.css`
- `success.html`
- `failure.html`
- `pending.html`
- `api/create-preference.js`

Agregados:
- `api/mercadopago-webhook.js`
- `supabase-schema.sql`
- `README-checkout.md`

## Variables de entorno

Configurar en Vercel:

```env
MERCADOPAGO_ACCESS_TOKEN=
PUBLIC_SITE_URL=https://kunsanggarmexico.com
TSA_LUNG_PRICE=2000
MIL_OFRENDAS_PRICE=2000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

No poner `MERCADOPAGO_ACCESS_TOKEN` ni `SUPABASE_SERVICE_ROLE_KEY` en HTML o JS público.

La Public Key de Mercado Pago puede usarse en frontend si después se integra Bricks, pero Checkout Pro con preferencia
solo necesita `MERCADOPAGO_ACCESS_TOKEN` en backend. Si un Access Token se compartió en texto plano, rotarlo en Mercado
Pago antes de producción y configurar el nuevo valor únicamente como variable de entorno.

## Supabase

1. Crear proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar `supabase-schema.sql`.
4. Copiar `Project URL` a `SUPABASE_URL`.
5. Copiar `service_role key` a `SUPABASE_SERVICE_ROLE_KEY`.

La tabla usada es `public.ticket_orders`.

## Vercel

Hostinger estático no ejecuta funciones `/api`. Para este flujo, desplegar `landing-eventos` como proyecto en Vercel:

1. Importar el repositorio en Vercel.
2. Configurar `Root Directory` como `landing-eventos`.
3. Framework preset: `Other`.
4. Build command: vacío.
5. Output directory: vacío o `.`.
6. Agregar las variables de entorno.
7. Desplegar.

El frontend llama a:

```txt
POST /api/create-preference
```

Mercado Pago notificará a:

```txt
https://kunsanggarmexico.com/api/mercadopago-webhook
```

## Flujo

1. El usuario llena datos y da clic en `Comprar boleto TSA Lung` o `Comprar boleto Mil Ofrendas`.
2. `script.js` dispara `fbq('track', 'InitiateCheckout')`.
3. El frontend llama a `/api/create-preference`.
4. La función inserta una orden `created` en Supabase.
5. La función crea una preferencia en Mercado Pago.
6. Mercado Pago redirige al usuario a Checkout Pro.
7. Mercado Pago regresa a `success.html`, `failure.html` o `pending.html`.
8. Mercado Pago llama al webhook y este actualiza `ticket_orders`.

## Eventos Meta Pixel

- `PageView`: se mantiene en el pixel base.
- `ViewContent`: se dispara al cargar la landing.
- `WhatsAppClickTsaLung`: se mantiene para clics de WhatsApp.
- `InitiateCheckout`: se dispara al iniciar pago.
- `Purchase`: solo en `success.html` cuando los parámetros indican `approved`.

## Checklist de pruebas

- Abrir la landing y confirmar `PageView` y `ViewContent` en Events Manager.
- Clic en WhatsApp y confirmar `WhatsAppClickTsaLung`.
- Llenar formulario de compra y confirmar `InitiateCheckout`.
- Confirmar que `/api/create-preference` responde `init_point`, `preference_id`, `external_reference`.
- Confirmar que Supabase crea una fila con `payment_status = created`.
- Completar pago de prueba en Mercado Pago.
- Confirmar que `success.html` muestra pago recibido.
- Confirmar que `Purchase` aparece solo con pago aprobado.
- Confirmar que el webhook actualiza `payment_status`, `payment_id`, `payment_method` y `raw_payment`.
- Probar pago rechazado y revisar `failure.html`.
- Probar pago pendiente por SPEI/OXXO y revisar `pending.html`.
