import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { departamento, passwordActual, passwordNueva } = await request.json();

        if (!departamento || !passwordActual || !passwordNueva) {
            return NextResponse.json(
                { error: "Faltan datos requeridos" },
                { status: 400 }
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

        // Leer usuarios
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: "usuarios!A2:C",
        });

        const usuarios = response.data.values || [];

        // Buscar usuario y verificar contraseña actual
        const usuarioIndex = usuarios.findIndex(
            (row) => row && row[0] === departamento && row[1] === passwordActual
        );

        if (usuarioIndex === -1) {
            return NextResponse.json(
                { error: "Contraseña actual incorrecta" },
                { status: 401 }
            );
        }

        // Actualizar contraseña (fila = index + 2 porque empieza en A2)
        const rowNumber = usuarioIndex + 2;
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: `usuarios!B${rowNumber}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[passwordNueva]],
            },
        });

        return NextResponse.json({
            success: true,
            message: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        return NextResponse.json(
            { error: "Error al cambiar contraseña" },
            { status: 500 }
        );
    }
}