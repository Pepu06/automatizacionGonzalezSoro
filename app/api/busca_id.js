import { google } from "googleapis";
import { drive } from "./lib/google";
import { normalizarDepartamento } from "./lib/normalizar";

// Resuelve en UNA sola llamada a Drive el spreadsheet de cada departamento,
// en vez de una búsqueda por nombre por cada uno. Devuelve un mapa
// nombreNormalizado -> spreadsheetId.
export async function obtenerMapaSpreadsheetIds() {
  const mapa = {};
  let pageToken;

  do {
    const res = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
      fields: "nextPageToken, files(id, name)",
      pageSize: 1000,
      pageToken,
    });

    (res.data.files || []).forEach((file) => {
      mapa[normalizarDepartamento(file.name)] = file.id;
    });

    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return mapa;
}

export async function obtenerSpreadsheetId(nombreDepartamento) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets"
    ]
  });

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `
      mimeType='application/vnd.google-apps.spreadsheet'
      and name='${nombreDepartamento}'
      and trashed=false
    `,
    fields: "files(id, name)",
  });

  if (res.data.files.length === 0) {
    throw new Error("No se encontró el spreadsheet del departamento");
  }

  return res.data.files[0].id;
}
