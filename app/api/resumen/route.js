import { sheets } from "../lib/google";

const SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";
const SPREADSHEET_ID_USUARIOS = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";

async function obtenerDepartamentos() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID_USUARIOS,
            range: "usuarios!A2:A",
        });

        const rows = response.data.values || [];
        const departamentos = [...new Set(
            rows
                .map(row => row[0])
                .filter(depto => depto && depto.trim() !== "")
        )].sort();

        return departamentos;
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}

const IMPUESTOS = [
    "EDESUR", "AYSA", "METROGAS", "ABL", "EXPENSAS", "TELECOM",
    "AYSAUC", "ABLUC", "MUNICIPAL", "ARBA",
];

// --- CAMBIO 1: Normalización más agresiva (quita espacios y puntos) ---
const normalizarDepartamento = (valor) =>
    (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") // Elimina espacios, guiones y cualquier símbolo
        .trim();

// Creamos el mapa con la nueva normalización
const crearMapaDepartamentos = (departamentos) => {
    return departamentos.reduce(
        (acc, depto) => {
            acc[normalizarDepartamento(depto)] = depto;
            return acc;
        },
        {}
    );
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes");

        if (!mes) {
            return Response.json({ error: "Mes requerido" }, { status: 400 });
        }

        // Obtener departamentos dinámicamente
        const DEPARTAMENTOS = await obtenerDepartamentos();
        const DEPARTAMENTO_CANONICO_POR_NOMBRE_NORMALIZADO = crearMapaDepartamentos(DEPARTAMENTOS);
        
        // DEBUG: Mostrar departamentos cargados
        console.log("📋 Departamentos cargados de usuarios:");
        console.log(DEPARTAMENTOS.map(d => `  - "${d}"`).join("\n"));

        // Leemos hasta fila 500 para asegurar que capturamos todos los departamentos
        const range = `${mes}!A2:K500`;
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range,
        });

        const values = res.data.values || [];
        const data = {};

        DEPARTAMENTOS.forEach((depto) => {
            data[depto] = {};
            IMPUESTOS.forEach((imp) => {
                data[depto][imp] = { pagado: false, monto: 0 };
            });
        });

        values.forEach((row, rowIdx) => {
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

            IMPUESTOS.forEach((imp, colIdx) => {
                const raw = row?.[colIdx + 1];

                // --- CAMBIO 2: Limpieza de monto más robusta ---
                let monto = 0;
                if (raw !== undefined && raw !== null && raw !== "") {
                    monto = typeof raw === "string"
                        ? Number(raw.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "").trim())
                        : Number(raw) || 0;
                }

                data[deptoCanonico][imp] = {
                    pagado: monto > 0,
                    monto,
                };
            });
        });

        let emails = {};
        try {
            const usuariosRes = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID_USUARIOS,
                range: "usuarios!A2:D",
            });

            const usuarios = usuariosRes.data.values || [];
            usuarios.forEach((row) => {
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

        return Response.json({ data, emails });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Error cargando resumen", details: err.message },
            { status: 500 }
        );
    }
}