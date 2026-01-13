import { google } from "googleapis";
import { obtenerSpreadsheetId } from "../busca_id";
import { Readable } from "stream";
import { enviarMail } from "../lib/mailer";

const ROOT_FOLDER_ID = "1Sa9TRwwCzVv2bqS21AQV79yBavsyPJ-s";

const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const maxDuration = 60;

// cada año ocupa 15 filas
const FILA_INICIAL_POR_ANIO = {
    2025: 5,
    2026: 20,
    2027: 35,
    2028: 50,
    2029: 65,
    2030: 80,
};

function obtenerAnioDelImpuesto(mesSeleccionado) {
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth(); // 0 = enero

    const indiceMes = MESES.indexOf(mesSeleccionado);
    if (indiceMes === -1) return null;

    return indiceMes > mesActual ? anioActual - 1 : anioActual;
}

function obtenerFila(anio, mes) {
    const filaBase = FILA_INICIAL_POR_ANIO[anio];
    if (!filaBase) return null;

    const indiceMes = MESES.indexOf(mes);
    if (indiceMes === -1) return null;

    return filaBase + indiceMes;
}

async function obtenerOCrearCarpeta(drive, nombre, parentId) {
    const res = await drive.files.list({
        q: `
      name='${nombre}'
      and mimeType='application/vnd.google-apps.folder'
      and '${parentId}' in parents
      and trashed=false
    `,
        fields: "files(id, name)",
    });

    if (res.data.files.length > 0) {
        return res.data.files[0].id;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: nombre,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentId],
        },
    });

    return folder.data.id;
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const departamento = formData.get("departamento");
        const impuesto = formData.get("impuesto"); // nombre de la hoja
        const mes = formData.get("mes");
        const importeRaw = formData.get("importe");
        const importe = parseFloat(importeRaw.replace(',', '.'));
        const comprobante = formData.get("comprobante");

        const spreadsheetId = await obtenerSpreadsheetId(departamento);

        const anioImpuesto = obtenerAnioDelImpuesto(mes);
        const fila = obtenerFila(anioImpuesto, mes);

        if (!spreadsheetId || !impuesto || !fila) {
            return Response.json(
                { error: "Datos inválidos", debug: { spreadsheetId, impuesto, anioImpuesto, fila } },
                { status: 400 }
            );
        }

        // 👉 escribimos en la hoja del impuesto
        const rango = `'${impuesto}'C${fila}`;

        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        auth.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        const drive = google.drive({ version: "v3", auth });
        const sheets = google.sheets({ version: "v4", auth });

        const departamentoFolderId = await obtenerOCrearCarpeta(
            drive,
            departamento,
            ROOT_FOLDER_ID
        );

        const impuestoFolderId = await obtenerOCrearCarpeta(
            drive,
            impuesto,
            departamentoFolderId
        );

        const carpetaUrl = `https://drive.google.com/drive/folders/${impuestoFolderId}`;

        if (comprobante) {
            const buffer = Buffer.from(await comprobante.arrayBuffer());
            const stream = Readable.from(buffer);

            await drive.files.create({
                requestBody: {
                    name: `${mes} - ${impuesto}.${comprobante.name.split(".").pop()}`,
                    parents: [impuestoFolderId],
                },
                media: {
                    mimeType: comprobante.type,
                    body: stream,
                },
            });
        }

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `'${impuesto}'!C${fila}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[importe]],
            },
        });

        await enviarMail({
            to: "mvcalvar@gmail.com",
            subject: `📎 Comprobante cargado – ${departamento} / ${impuesto}`,
            html: `
                <h2>Nuevo comprobante cargado</h2>
                <p><strong>Departamento:</strong> ${departamento}</p>
                <p><strong>Impuesto:</strong> ${impuesto}</p>
                <p><strong>Mes:</strong> ${mes}</p>
                <p><strong>Monto:</strong> $${importe}</p>

                <p>
                👉 <a href="${carpetaUrl}" target="_blank">
                    Ver carpeta del impuesto en Drive
                </a>
                </p>
            `,
        });

        return Response.json({ ok: true, rango });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Error interno", details: err.message },
            { status: 500 }
        );
    }
}
