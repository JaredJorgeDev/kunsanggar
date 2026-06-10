# Automatización del evento

## Flujo recomendado

1. Meta Ads envía tráfico a la landing con UTM.
2. La landing dispara `PageView`.
3. Al elegir una entrada se dispara `InitiateCheckout`.
4. Al enviar el formulario se dispara `Lead`.
5. El registro se guarda en Google Sheets o CRM.
6. La persona pasa a pago o WhatsApp con mensaje prellenado.
7. La organizadora actualiza `estatus_pago` en la hoja y filtra asistentes confirmados.

## Configuración rápida

1. Crea un Google Sheet llamado `Registros Geshe`.
2. Abre `Extensiones -> Apps Script`.
3. Pega `setup/google-apps-script.gs`.
4. Implementa como `Aplicación web`.
5. Permisos: ejecutar como tú, acceso para cualquiera.
6. Copia la URL y reemplaza en `index.html`:
   `data-endpoint="PEGA_AQUI_URL_APPS_SCRIPT"`.
7. Reemplaza `PEGA_AQUI_LINK_DE_PAGO` por el link de Stripe, Mercado Pago, Hotmart o página de pago.
8. Reemplaza `META_PIXEL_ID` por el Pixel de Meta.
9. Reemplaza `520000000000` por el WhatsApp real con lada.

## Campañas Meta sugeridas

- Campaña 1: Reconocimiento local, video/foto contemplativa, objetivo interacción.
- Campaña 2: Leads o ventas, tráfico a `/#registro`, objetivo conversiones.
- Campaña 3: Remarketing a visitantes y personas que iniciaron checkout sin completar.

## Eventos medibles

- `PageView`: visita a landing.
- `Lead`: envío de formulario y clics principales.
- `InitiateCheckout`: selección de tipo de entrada.

## Mensajes automáticos sugeridos

Confirmación inicial:

> Gracias por registrarte para la visita del Geshe. Recibimos tus datos y reservamos tu solicitud. Para confirmar tu lugar, completa el pago en el enlace indicado. Te enviaremos ubicación y recomendaciones antes del evento.

Recordatorio:

> Te recordamos tu actividad de Budismo Bon este fin de semana. Te sugerimos llegar 15 minutos antes, vestir cómodo y traer libreta si deseas tomar notas.
