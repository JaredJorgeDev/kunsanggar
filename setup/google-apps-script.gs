const SHEET_NAME = "Registros";

function doPost(e) {
  const sheet = getSheet();
  const payload = e.parameter || {};
  const headers = [
    "fecha_registro",
    "nombre",
    "correo",
    "telefono",
    "tipo_acceso",
    "observaciones",
    "fuente",
    "campaign",
    "url",
    "estatus_pago",
    "notas_internas"
  ];

  ensureHeaders(sheet, headers);

  const row = headers.map((header) => {
    if (header === "estatus_pago") return "Pendiente";
    if (header === "notas_internas") return "";
    return payload[header] || "";
  });

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders(sheet, headers) {
  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = currentHeaders.some(Boolean);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}
