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
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
async function enviarMail({ to, subject, html }) {
    return transporter.sendMail({
        from: `"Impuestos Bot 🤖" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html
    });
}
}),
"[project]/app/api/impuestos/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/googleapis/build/src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$busca_id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/busca_id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$mailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/lib/mailer.js [app-route] (ecmascript)");
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
async function obtenerOCrearCarpeta(drive, nombre, parentId) {
    const res = await drive.files.list({
        q: `
      name='${nombre}'
      and mimeType='application/vnd.google-apps.folder'
      and '${parentId}' in parents
      and trashed=false
    `,
        fields: "files(id, name)"
    });
    if (res.data.files.length > 0) {
        return res.data.files[0].id;
    }
    const folder = await drive.files.create({
        requestBody: {
            name: nombre,
            mimeType: "application/vnd.google-apps.folder",
            parents: [
                parentId
            ]
        }
    });
    return folder.data.id;
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
        const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        auth.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });
        const drive = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].drive({
            version: "v3",
            auth
        });
        const sheets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].sheets({
            version: "v4",
            auth
        });
        const departamentoFolderId = await obtenerOCrearCarpeta(drive, departamento, ROOT_FOLDER_ID);
        const impuestoFolderId = await obtenerOCrearCarpeta(drive, impuesto, departamentoFolderId);
        const carpetaUrl = `https://drive.google.com/drive/folders/${impuestoFolderId}`;
        if (comprobante) {
            const buffer = Buffer.from(await comprobante.arrayBuffer());
            const stream = __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"].from(buffer);
            await drive.files.create({
                requestBody: {
                    name: `${mes} - ${impuesto}.${comprobante.name.split(".").pop()}`,
                    parents: [
                        impuestoFolderId
                    ]
                },
                media: {
                    mimeType: comprobante.type,
                    body: stream
                }
            });
        }
        await sheets.spreadsheets.values.update({
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$mailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enviarMail"])({
            to: "pedrogonzalezsoro@gmail.com",
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
            `
        });
        return Response.json({
            ok: true,
            rango
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

//# sourceMappingURL=%5Broot-of-the-server%5D__7c0b293f._.js.map