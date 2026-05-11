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
"[project]/app/api/sincronizar-maestro/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/lib/google.js [app-route] (ecmascript)");
;
const MAESTRO_SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";
const USUARIOS_SPREADSHEET_ID = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";
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
const normalizarDepartamento = (valor)=>(valor || "").toString().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes") || MESES[new Date().getMonth()];
        console.log(`\n📊 Comparando departamentos para ${mes}...\n`);
        // 1. Obtener lista de departamentos desde usuarios
        const usuariosRes = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.get({
            spreadsheetId: USUARIOS_SPREADSHEET_ID,
            range: "usuarios!A2:A"
        });
        const departamentosEnUsuarios = (usuariosRes.data.values || []).map((row)=>row[0]).filter((depto)=>depto && depto.trim() !== "" && depto !== "Admin").sort();
        console.log(`📋 Departamentos en USUARIOS: ${departamentosEnUsuarios.length}`);
        departamentosEnUsuarios.forEach((d, i)=>{
            console.log(`   ${i + 1}. ${d}`);
        });
        // 2. Obtener lista de departamentos desde el maestro (mes actual)
        const maestroRes = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$lib$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sheets"].spreadsheets.values.get({
            spreadsheetId: MAESTRO_SPREADSHEET_ID,
            range: `${mes}!A2:A`
        });
        const departamentosEnMaestro = (maestroRes.data.values || []).map((row)=>row[0]).filter((depto)=>depto && depto.trim() !== "").sort();
        console.log(`\n📚 Departamentos en MAESTRO (${mes}): ${departamentosEnMaestro.length}`);
        departamentosEnMaestro.forEach((d, i)=>{
            console.log(`   ${i + 1}. ${d}`);
        });
        // 3. Comparar y encontrar faltantes
        const faltantes = departamentosEnUsuarios.filter((depto)=>{
            const normUsuarios = normalizarDepartamento(depto);
            return !departamentosEnMaestro.some((depto2)=>normalizarDepartamento(depto2) === normUsuarios);
        });
        // 4. Encontrar departamentos que están de más en el maestro
        const extras = departamentosEnMaestro.filter((depto)=>{
            const normMaestro = normalizarDepartamento(depto);
            return !departamentosEnUsuarios.some((depto2)=>normalizarDepartamento(depto2) === normMaestro);
        });
        console.log(`\n⚠️ DEPARTAMENTOS FALTANTES EN MAESTRO: ${faltantes.length}`);
        if (faltantes.length > 0) {
            faltantes.forEach((d, i)=>{
                console.log(`   ${i + 1}. ❌ ${d}`);
            });
        } else {
            console.log("   ✅ Todos los departamentos están en el maestro");
        }
        console.log(`\n⚠️ DEPARTAMENTOS EXTRAS EN MAESTRO: ${extras.length}`);
        if (extras.length > 0) {
            extras.forEach((d, i)=>{
                console.log(`   ${i + 1}. 🔄 ${d}`);
            });
        } else {
            console.log("   ✅ No hay departamentos extras");
        }
        return Response.json({
            mes,
            resumen: {
                enUsuarios: departamentosEnUsuarios.length,
                enMaestro: departamentosEnMaestro.length,
                faltantesEnMaestro: faltantes.length,
                extrasEnMaestro: extras.length
            },
            faltantes,
            extras,
            departamentosEnUsuarios,
            departamentosEnMaestro
        });
    } catch (err) {
        console.error("❌ Error:", err);
        return Response.json({
            error: "Error",
            details: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3de95609._.js.map