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
"[project]/app/api/resumen/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/lib/google.js [app-route] (ecmascript)");
;
const SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";
const SPREADSHEET_ID_USUARIOS = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";
async function obtenerDepartamentos() {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID_USUARIOS,
            range: "usuarios!A2:A"
        });
        const rows = response.data.values || [];
        const departamentos = [
            ...new Set(rows.map((row)=>row[0]).filter((depto)=>depto && depto.trim() !== ""))
        ].sort();
        return departamentos;
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}
const IMPUESTOS = [
    "EDESUR",
    "AYSA",
    "METROGAS",
    "ABL",
    "EXPENSAS",
    "TELECOM",
    "AYSAUC",
    "ABLUC",
    "MUNICIPAL",
    "ARBA"
];
// --- CAMBIO 1: Normalización más agresiva (quita espacios y puntos) ---
const normalizarDepartamento = (valor)=>(valor || "").toString().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]/g, "") // Elimina espacios, guiones y cualquier símbolo
    .trim();
// Creamos el mapa con la nueva normalización
const crearMapaDepartamentos = (departamentos)=>{
    return departamentos.reduce((acc, depto)=>{
        acc[normalizarDepartamento(depto)] = depto;
        return acc;
    }, {});
};
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes");
        if (!mes) {
            return Response.json({
                error: "Mes requerido"
            }, {
                status: 400
            });
        }
        // Obtener departamentos dinámicamente
        const DEPARTAMENTOS = await obtenerDepartamentos();
        const DEPARTAMENTO_CANONICO_POR_NOMBRE_NORMALIZADO = crearMapaDepartamentos(DEPARTAMENTOS);
        // DEBUG: Mostrar departamentos cargados
        console.log("📋 Departamentos cargados de usuarios:");
        console.log(DEPARTAMENTOS.map((d)=>`  - "${d}"`).join("\n"));
        // Leemos hasta fila 500 para asegurar que capturamos todos los departamentos
        const range = `${mes}!A2:K500`;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range
        });
        const values = res.data.values || [];
        const data = {};
        DEPARTAMENTOS.forEach((depto)=>{
            data[depto] = {};
            IMPUESTOS.forEach((imp)=>{
                data[depto][imp] = {
                    pagado: false,
                    monto: 0
                };
            });
        });
        values.forEach((row, rowIdx)=>{
            const nombreHoja = row?.[0];
            const deptoNormalizado = normalizarDepartamento(nombreHoja);
            const deptoCanonico = DEPARTAMENTO_CANONICO_POR_NOMBRE_NORMALIZADO[deptoNormalizado];
            // Debug: Mostrar todos los nombres leídos
            console.log(`Fila ${rowIdx + 2}: "${nombreHoja}" → normalizado: "${deptoNormalizado}" → encontrado: ${deptoCanonico ? "✅ " + deptoCanonico : "❌"}`);
            if (!deptoCanonico && nombreHoja) {
                console.log("⚠️ ERROR DE COINCIDENCIA:");
                console.log(`- Leído en la hoja: "${nombreHoja}"`);
                console.log(`- Normalizado como: "${deptoNormalizado}"`);
                console.log("-----------------------------------");
            }
            // Si no lo encuentra, lo salteamos
            if (!deptoCanonico) return;
            IMPUESTOS.forEach((imp, colIdx)=>{
                const raw = row?.[colIdx + 1];
                // --- CAMBIO 2: Limpieza de monto más robusta ---
                let monto = 0;
                if (raw !== undefined && raw !== null && raw !== "") {
                    monto = typeof raw === "string" ? Number(raw.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "").trim()) : Number(raw) || 0;
                }
                data[deptoCanonico][imp] = {
                    pagado: monto > 0,
                    monto
                };
            });
        });
        let emails = {};
        try {
            const usuariosRes = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID_USUARIOS,
                range: "usuarios!A2:D"
            });
            const usuarios = usuariosRes.data.values || [];
            usuarios.forEach((row)=>{
                const departamento = row?.[0];
                const email = row?.[3];
                if (departamento && email) {
                    // Usamos la misma normalización para los emails
                    emails[normalizarDepartamento(departamento)] = email;
                }
            });
        } catch (error) {
            console.warn("No se pudieron cargar los emails:", error?.message);
        }
        return Response.json({
            data,
            emails
        });
    } catch (err) {
        console.error(err);
        return Response.json({
            error: "Error cargando resumen",
            details: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9c8de20d._.js.map