import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            return NextResponse.json(
                { error: "Configuración del servidor incompleta" },
                { status: 500 }
            );
        }

        let privateKey = process.env.GOOGLE_PRIVATE_KEY;
        if (privateKey.startsWith('"')) {
            privateKey = JSON.parse(privateKey);
        }
        privateKey = privateKey.replace(/\\n/g, "\n");

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // Leer departamentos desde la hoja de usuarios (columna A)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: "usuarios!A2:A",
        });

        const rows = response.data.values || [];
        
        // Extraer departamentos únicos y filtrar vacíos
        const departamentos = [...new Set(
            rows
                .map(row => row[0])
                .filter(depto => depto && depto.trim() !== "")
        )].sort();

        return NextResponse.json({
            success: true,
            departamentos,
            count: departamentos.length,
        });
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return NextResponse.json(
            { error: "Error al obtener departamentos" },
            { status: 500 }
        );
    }
}
