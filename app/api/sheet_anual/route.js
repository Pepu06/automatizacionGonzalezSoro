import { google } from "googleapis";
import { obtenerSpreadsheetId } from "../busca_id.js"; 
import { NextResponse } from "next/server";

export async function GET() {
  // Verificación de credenciales en consola del servidor
  console.log("Credenciales cargadas:", process.env.GOOGLE_CREDENTIALS ? "SÍ" : "NO");

  const MAESTRO_SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
  });
  
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: MAESTRO_SPREADSHEET_ID,
      range: "CONFIG!A2:A",
    });

    const nombres = response.data.values;
    if (!nombres || nombres.length === 0) {
      return NextResponse.json({ message: "No se encontraron nombres" });
    }

    const filasParaEscribir = [];

    for (const fila of nombres) {
      const nombreDept = fila[0];
      try {
        const id = await obtenerSpreadsheetId(nombreDept);
        const link = `https://docs.google.com/spreadsheets/d/${id}/`;
        filasParaEscribir.push([link]);
      } catch (error) {
        filasParaEscribir.push(["LINK NO ENCONTRADO"]);
      }
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: MAESTRO_SPREADSHEET_ID,
      range: "CONFIG!B2",
      valueInputOption: "RAW",
      requestBody: { values: filasParaEscribir },
    });

    return NextResponse.json({ message: "Hoja CONFIG actualizada con éxito" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}