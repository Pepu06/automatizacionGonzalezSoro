import { sheets } from "../lib/google";

const MAESTRO_SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";
const USUARIOS_SPREADSHEET_ID = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const normalizarDepartamento = (valor) =>
    (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();

// Distancia de Levenshtein, para detectar nombres casi iguales
// (ej: "Laprida 1898" vs "Lapida 1898") y corregirlos en la maestra.
function distancia(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => {
        const fila = new Array(n + 1).fill(0);
        fila[0] = i;
        return fila;
    });
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }
    return dp[m][n];
}

// Deja la columna A de cada pestaña de mes igual a la lista de usuarios:
// corrige nombres con tipeos (matcheo exacto normalizado o distancia <= 2 sin
// ambigüedad) y agrega al final la fila de los departamentos que falten.
async function corregirMaestro(departamentosEnUsuarios) {
    const canonicoPorNorm = {};
    departamentosEnUsuarios.forEach((d) => {
        canonicoPorNorm[normalizarDepartamento(d)] = d;
    });

    const reporte = {};

    for (const mes of MESES) {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: MAESTRO_SPREADSHEET_ID,
            range: `${mes}!A2:A500`,
        });
        const filas = res.data.values || [];

        const renombres = [];
        const presentes = new Set();

        filas.forEach((row, i) => {
            const texto = row?.[0];
            if (!texto || !texto.toString().trim()) return;
            const norm = normalizarDepartamento(texto);
            const canonico = canonicoPorNorm[norm];
            if (canonico) {
                presentes.add(norm);
                if (texto !== canonico) {
                    renombres.push({ fila: i + 2, de: texto, a: canonico });
                }
            }
        });

        // Segundo pase: filas de la maestra que no matchean con nadie;
        // buscamos un usuario todavía ausente a distancia <= 2 y sin ambigüedad
        filas.forEach((row, i) => {
            const texto = row?.[0];
            if (!texto || !texto.toString().trim()) return;
            const norm = normalizarDepartamento(texto);
            if (canonicoPorNorm[norm]) return;

            const candidatos = Object.entries(canonicoPorNorm).filter(
                ([n]) => !presentes.has(n) && distancia(norm, n) <= 2
            );
            if (candidatos.length === 1) {
                const [n, canonico] = candidatos[0];
                presentes.add(n);
                renombres.push({ fila: i + 2, de: texto, a: canonico });
            }
        });

        const faltantes = Object.entries(canonicoPorNorm)
            .filter(([n]) => !presentes.has(n))
            .map(([, canonico]) => canonico);

        if (renombres.length > 0) {
            await sheets.spreadsheets.values.batchUpdate({
                spreadsheetId: MAESTRO_SPREADSHEET_ID,
                requestBody: {
                    valueInputOption: "RAW",
                    data: renombres.map((r) => ({
                        range: `${mes}!A${r.fila}`,
                        values: [[r.a]],
                    })),
                },
            });
        }

        if (faltantes.length > 0) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: MAESTRO_SPREADSHEET_ID,
                range: `${mes}!A2:K`,
                valueInputOption: "RAW",
                insertDataOption: "INSERT_ROWS",
                requestBody: { values: faltantes.map((d) => [d]) },
            });
        }

        reporte[mes] = { renombres, agregados: faltantes };
    }

    return reporte;
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes") || MESES[new Date().getMonth()];
        const fix = searchParams.get("fix") === "1";

        console.log(`\n📊 Comparando departamentos para ${mes}...\n`);

        // 1. Obtener lista de departamentos desde usuarios
        const usuariosRes = await sheets.spreadsheets.values.get({
            spreadsheetId: USUARIOS_SPREADSHEET_ID,
            range: "usuarios!A2:A",
        });

        const departamentosEnUsuarios = (usuariosRes.data.values || [])
            .map(row => row[0])
            .filter(depto => depto && depto.trim() !== "" && depto !== "Admin")
            .sort();

        console.log(`📋 Departamentos en USUARIOS: ${departamentosEnUsuarios.length}`);
        departamentosEnUsuarios.forEach((d, i) => {
            console.log(`   ${i + 1}. ${d}`);
        });

        // Modo corrección: alinea la columna A de las 12 pestañas de la
        // maestra con la lista de usuarios y devuelve el detalle de cambios
        if (fix) {
            const reporte = await corregirMaestro(departamentosEnUsuarios);
            return Response.json({ fix: true, reporte });
        }

        // 2. Obtener lista de departamentos desde el maestro (mes actual)
        const maestroRes = await sheets.spreadsheets.values.get({
            spreadsheetId: MAESTRO_SPREADSHEET_ID,
            range: `${mes}!A2:A`,
        });

        const departamentosEnMaestro = (maestroRes.data.values || [])
            .map(row => row[0])
            .filter(depto => depto && depto.trim() !== "")
            .sort();

        console.log(`\n📚 Departamentos en MAESTRO (${mes}): ${departamentosEnMaestro.length}`);
        departamentosEnMaestro.forEach((d, i) => {
            console.log(`   ${i + 1}. ${d}`);
        });

        // 3. Comparar y encontrar faltantes
        const faltantes = departamentosEnUsuarios.filter(depto => {
            const normUsuarios = normalizarDepartamento(depto);
            return !departamentosEnMaestro.some(
                depto2 => normalizarDepartamento(depto2) === normUsuarios
            );
        });

        // 4. Encontrar departamentos que están de más en el maestro
        const extras = departamentosEnMaestro.filter(depto => {
            const normMaestro = normalizarDepartamento(depto);
            return !departamentosEnUsuarios.some(
                depto2 => normalizarDepartamento(depto2) === normMaestro
            );
        });

        console.log(`\n⚠️ DEPARTAMENTOS FALTANTES EN MAESTRO: ${faltantes.length}`);
        if (faltantes.length > 0) {
            faltantes.forEach((d, i) => {
                console.log(`   ${i + 1}. ❌ ${d}`);
            });
        } else {
            console.log("   ✅ Todos los departamentos están en el maestro");
        }

        console.log(`\n⚠️ DEPARTAMENTOS EXTRAS EN MAESTRO: ${extras.length}`);
        if (extras.length > 0) {
            extras.forEach((d, i) => {
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
                extrasEnMaestro: extras.length,
            },
            faltantes,
            extras,
            departamentosEnUsuarios,
            departamentosEnMaestro,
        });

    } catch (err) {
        console.error("❌ Error:", err);
        return Response.json(
            { error: "Error", details: err.message },
            { status: 500 }
        );
    }
}
