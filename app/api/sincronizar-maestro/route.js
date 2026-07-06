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

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes") || MESES[new Date().getMonth()];

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
