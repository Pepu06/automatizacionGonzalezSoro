import { obtenerSpreadsheetId } from "../busca_id";
import { enviarMail } from "../lib/mailer";
import { sheets } from "../lib/google";
import { subirComprobanteImpuesto } from "../lib/drive-upload";


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

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `'${impuesto}'!C${fila}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[importe]],
            },
        });

        let driveResult = null;

        if (comprobante) {
            try {
                driveResult = await subirComprobanteImpuesto({ departamento, impuesto, mes, comprobante });
            } catch (driveErr) {
                return Response.json(
                    { status: "error", message: driveErr.message },
                    { status: 400 }
                );
            }
        }

        await enviarMail({
            to: "mvcalvar@gmail.com",
            subject: `📎 Impuesto actualizado – ${departamento} / ${impuesto}`,
            html: `
                <h2>Impuesto actualizado en el spreadsheet</h2>
                <p><strong>Departamento:</strong> ${departamento}</p>
                <p><strong>Impuesto:</strong> ${impuesto}</p>
                <p><strong>Mes:</strong> ${mes}</p>
                <p><strong>Monto:</strong> $${importe}</p>
            `,
        });

        return Response.json({ ok: true, rango, drive: driveResult });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Error interno", details: err.message },
            { status: 500 }
        );
    }
}
