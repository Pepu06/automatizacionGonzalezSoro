import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { password } = await request.json();

        console.log("=== LOGIN ATTEMPT ===");
        console.log("Password recibido:", password);

        if (!password) {
            return NextResponse.json(
                { error: "Contraseña requerida" },
                { status: 400 }
            );
        }

        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error("❌ Faltan variables de entorno");
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

        console.log("📊 Leyendo Google Sheets...");

        // Leer todos los usuarios (Departamento y Contraseña)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: "usuarios!A2:B",
        });

        const usuarios = response.data.values || [];

        console.log("Usuarios encontrados:", usuarios.length);
        console.log("Primeros 3 usuarios:", usuarios.slice(0, 3));

        if (usuarios.length === 0) {
            return NextResponse.json(
                { error: "No hay usuarios registrados en la hoja 'usuarios'" },
                { status: 401 }
            );
        }

        // Buscar usuario por contraseña (columna B)
        const usuario = usuarios.find((row) => row && row[1] === password);

        console.log("Usuario encontrado:", usuario ? `${usuario[0]} (${usuario[1]})` : "NO ENCONTRADO");

        if (!usuario) {
            return NextResponse.json(
                { error: "Contraseña incorrecta" },
                { status: 401 }
            );
        }

        console.log("✅ Login exitoso para:", usuario[0]);

        // Devolver el departamento asociado a esa contraseña
        return NextResponse.json({
            success: true,
            departamento: usuario[0], // Columna A = Departamento
        });
    } catch (error) {
        console.error("❌ Error completo en login:", error);
        return NextResponse.json(
            { error: `Error: ${error.message}` },
            { status: 500 }
        );
    }
}