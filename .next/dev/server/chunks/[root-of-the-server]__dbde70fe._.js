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
"[project]/app/api/resumen/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/googleapis/build/src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$busca_id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/busca_id.js [app-route] (ecmascript)");
;
;
const COLUMNAS = {
    EDESUR: "B",
    AYSA: "C",
    METROGAS: "D",
    ABL: "E",
    EXPENSAS: "F",
    TELECOM: "G",
    YSAUC: "H",
    ABLUC: "I",
    MUNICIPAL: "J",
    ARBA: "K"
};
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
const FILA_INICIAL_POR_ANIO = {
    2025: 15,
    2026: 30,
    2027: 45,
    2028: 60,
    2029: 75,
    2030: 90
};
const DEPARTAMENTOS = [
    "Acevedo",
    "Alsina 1138",
    "Alsina 1905",
    "Aráoz",
    "Artigas",
    "Austria",
    "Av la Plata",
    "Avellaneda",
    "Ayacucho 1085",
    "Ayacucho 331",
    "Bernardo de Irigoyen",
    "Beruti",
    "Billinghurst",
    "Bulnes",
    "Cervantes",
    "Charcas",
    "Cramer",
    "Don Bosco",
    "El Potrero",
    "Esmeralda 3 K",
    "Esmeralda 5 A",
    "Esmeralda 5 D",
    "Eva Perón",
    "Formosa 129",
    "Formosa 380",
    "G Lorca cochera 340",
    "G Lorca cochera 97",
    "G Lorca piso 22",
    "G Lorca piso 3",
    "H Irigoyen",
    "Independencia",
    "La Rioja",
    "Lacarra",
    "Lapida 1898",
    "Las Heras",
    "Lavalle",
    "Lavalleja",
    "Libertad 844",
    "Libertad 960",
    "M T de Alvear",
    "Mar de las Pampas",
    "Mario Bravo 5 A",
    "Matheu 1 A",
    "Matheu 2 G",
    "Matheu 4 E",
    "Ortega y Gasset",
    "Paraguay 754",
    "Paraguay 783",
    "Pilar dormi",
    "Pueyrredon 1655",
    "Pueyrredon 1978",
    "Quimo Costa",
    "R Pena 10 C",
    "R Pena 10 D",
    "R Pena 2 B",
    "R Pena 2 C",
    "R Pena 2 D",
    "R Pena 3 D",
    "R Pena 4 C",
    "R Pena 4 D",
    "Ravignani",
    "Rawson",
    "Riobamba",
    "Rivadavia 1525",
    "Rivadavia 1611",
    "Rivadavia 4085",
    "Rivadavia 822",
    "Saavedra 2",
    "Saavedra PB",
    "San Benito",
    "San Juan",
    "Santa Fe 2545",
    "Siria 5 A",
    "Siria 7 27",
    "Talcahuano 1242",
    "Uruguay 14 D",
    "Uruguay 7 B",
    "Valle",
    "Vidt 2052",
    "Vidt 2137",
    "Yapeyú",
    "Yatay"
];
const IMPUESTOS = [
    "ABL",
    "ABLUC",
    "ARBA",
    "AYSA",
    "AYSAUC",
    "EDESUR",
    "EXPENSAS",
    "METROGAS",
    "MUNICIPAL",
    "TELECOM"
];
function obtenerAnioDelImpuesto(mesSeleccionado) {
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth();
    const meses = [
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
    const indiceMes = meses.indexOf(mesSeleccionado);
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
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes") || MESES[0];
        if (!MESES.includes(mes)) {
            return Response.json({
                error: "Mes inválido"
            }, {
                status: 400
            });
        }
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
        const anioImpuesto = obtenerAnioDelImpuesto(mes);
        const fila = obtenerFila(anioImpuesto, mes);
        // Obtener solo los departamentos que existen
        const departamentosExistentes = DEPARTAMENTOS;
        const resumenData = {};
        for (const departamento of departamentosExistentes){
            console.log("Procesando departamento:", departamento);
            try {
                const spreadsheetId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$busca_id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["obtenerSpreadsheetId"])(departamento);
                const range = `'RESUMEN'!A${fila}:K${fila}`;
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId,
                    range
                });
                const values = response.data.values?.[0] || [];
                const impuestosData = {};
                for (const impuesto of IMPUESTOS){
                    const columna = COLUMNAS[impuesto];
                    const columnIndex = columna.charCodeAt(0) - 65; // Convert A->0, B->1, etc
                    const valor = values[columnIndex];
                    impuestosData[impuesto] = {
                        pagado: valor && valor !== "" && !isNaN(parseFloat(valor)),
                        monto: valor && valor !== "" ? parseFloat(valor) : 0
                    };
                }
                resumenData[departamento] = impuestosData;
            } catch (err) {
                // Si hay error al leer los datos, inicializar con ceros
                const impuestosData = {};
                console.error("ERROR en", departamento, err.message);
                for (const impuesto of IMPUESTOS){
                    impuestosData[impuesto] = {
                        pagado: false,
                        monto: 0
                    };
                }
                resumenData[departamento] = impuestosData;
            }
        }
        return Response.json({
            ok: true,
            mes,
            anio: anioImpuesto,
            fila,
            data: resumenData,
            departamentosEncontrados: departamentosExistentes.length
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

//# sourceMappingURL=%5Broot-of-the-server%5D__dbde70fe._.js.map