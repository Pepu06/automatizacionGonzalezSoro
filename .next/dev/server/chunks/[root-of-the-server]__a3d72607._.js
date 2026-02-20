module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/app/api/busca_id.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "obtenerSpreadsheetId",
    ()=>obtenerSpreadsheetId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/googleapis/build/src/index.js [app-route] (ecmascript)");
;
async function obtenerSpreadsheetId(nombreDepartamento) {
    const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
        scopes: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/spreadsheets"
        ]
    });
    const drive = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].drive({
        version: "v3",
        auth
    });
    const res = await drive.files.list({
        q: `
      mimeType='application/vnd.google-apps.spreadsheet'
      and name='${nombreDepartamento}'
      and trashed=false
    `,
        fields: "files(id, name)"
    });
    if (res.data.files.length === 0) {
        throw new Error("No se encontró el spreadsheet del departamento");
    }
    return res.data.files[0].id;
}
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/app/api/lib/mailer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enviarMail",
    ()=>enviarMail,
    "transporter",
    ()=>transporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
async function enviarMail({ to, subject, html }) {
    return transporter.sendMail({
        from: `"Impuestos Bot 🤖" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html
    });
}
}),
"[project]/app/api/lib/google.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drive",
    ()=>drive,
    "gmail",
    ()=>gmail,
    "sheets",
    ()=>sheets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/googleapis/build/src/index.js [app-route] (ecmascript)");
;
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/gmail.send"
    ]
});
const drive = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].drive({
    version: "v3",
    auth
});
const sheets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].sheets({
    version: "v4",
    auth
});
const gmail = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].gmail({
    version: "v1",
    auth
});
}),
"[project]/app/api/impuestos/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$busca_id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/busca_id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$mailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/lib/mailer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/lib/google.js [app-route] (ecmascript)");
;
;
;
;
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
    "Diciembre"
];
const maxDuration = 60;
// cada año ocupa 15 filas
const FILA_INICIAL_POR_ANIO = {
    2025: 5,
    2026: 20,
    2027: 35,
    2028: 50,
    2029: 65,
    2030: 80
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
async function POST(req) {
    try {
        const formData = await req.formData();
        const departamento = formData.get("departamento");
        const impuesto = formData.get("impuesto"); // nombre de la hoja
        const mes = formData.get("mes");
        const importeRaw = formData.get("importe");
        const importe = parseFloat(importeRaw.replace(',', '.'));
        const comprobante = formData.get("comprobante");
        const spreadsheetId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$busca_id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["obtenerSpreadsheetId"])(departamento);
        const anioImpuesto = obtenerAnioDelImpuesto(mes);
        const fila = obtenerFila(anioImpuesto, mes);
        if (!spreadsheetId || !impuesto || !fila) {
            return Response.json({
                error: "Datos inválidos",
                debug: {
                    spreadsheetId,
                    impuesto,
                    anioImpuesto,
                    fila
                }
            }, {
                status: 400
            });
        }
        // 👉 escribimos en la hoja del impuesto
        const rango = `'${impuesto}'C${fila}`;
        await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.update({
            spreadsheetId,
            range: `'${impuesto}'!C${fila}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        importe
                    ]
                ]
            }
        });
        let n8nResult = null; // 👈 Declaramos la variable aquí
        if (comprobante) {
            console.log("Enviando comprobante a n8n...");
            const n8nFormData = new FormData();
            n8nFormData.append("departamento", departamento);
            n8nFormData.append("impuesto", impuesto);
            n8nFormData.append("mes", mes);
            n8nFormData.append("importe", importe);
            n8nFormData.append("data0", comprobante);
            // URL DE PRODUCCIÓN (sin el -test)
            const n8nResponse = await fetch('https://primary-production-96028.up.railway.app/webhook/cargar-impuesto', {
                method: 'POST',
                body: n8nFormData
            });
            if (!n8nResponse.ok) {
                const errorText = await n8nResponse.text();
                throw new Error(`n8n error: ${n8nResponse.status} - ${errorText}`);
            }
            n8nResult = await n8nResponse.json(); // 👈 Ahora sí guardamos la respuesta
            console.log("Confirmación de n8n:", n8nResult);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$mailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enviarMail"])({
            to: "mvcalvar@gmail.com",
            subject: `📎 Impuesto actualizado – ${departamento} / ${impuesto}`,
            html: `
                <h2>Impuesto actualizado en el spreadsheet</h2>
                <p><strong>Departamento:</strong> ${departamento}</p>
                <p><strong>Impuesto:</strong> ${impuesto}</p>
                <p><strong>Mes:</strong> ${mes}</p>
                <p><strong>Monto:</strong> $${importe}</p>
            `
        });
        return Response.json({
            ok: true,
            rango,
            n8n: n8nResult
        });
    } catch (err) {
        console.error(err);
        return Response.json({
            error: "Error interno",
            details: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a3d72607._.js.map