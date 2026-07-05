import { sheets } from "../lib/google";
import { obtenerMapaSpreadsheetIds } from "../busca_id";
import { normalizarDepartamento } from "../lib/normalizar";
import { obtenerAnioDelImpuesto, obtenerFila } from "../lib/fechas";

const SPREADSHEET_ID_USUARIOS = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";

const IMPUESTOS = [
    "EDESUR", "AYSA", "METROGAS", "ABL", "EXPENSAS", "TELECOM",
    "AYSAUC", "ABLUC", "MUNICIPAL", "ARBA",
];

const CONCURRENCIA = 5;

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
                .filter(depto => depto && depto.trim() !== "" && depto !== "Admin")
        )].sort();

        return departamentos;
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}

function parsearMonto(raw) {
    if (raw === undefined || raw === null || raw === "") return 0;
    if (typeof raw === "number") return raw;

    const limpio = raw
        .toString()
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")
        .trim();

    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : 0;
}

// Ejecuta fn sobre items con a lo sumo `limite` tareas en simultáneo,
// para no pasarnos de la cuota de la API de Sheets/Drive.
async function porLotes(items, limite, fn) {
    let indice = 0;
    async function siguiente() {
        while (indice < items.length) {
            const i = indice++;
            await fn(items[i], i);
        }
    }
    await Promise.all(
        Array.from({ length: Math.min(limite, items.length) }, siguiente)
    );
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes");

        if (!mes) {
            return Response.json({ error: "Mes requerido" }, { status: 400 });
        }

        const anio = obtenerAnioDelImpuesto(mes);
        const fila = obtenerFila(anio, mes);

        if (!fila) {
            return Response.json({ error: "Mes inválido" }, { status: 400 });
        }

        const [DEPARTAMENTOS, mapaSpreadsheetIds] = await Promise.all([
            obtenerDepartamentos(),
            obtenerMapaSpreadsheetIds(),
        ]);

        const data = {};
        DEPARTAMENTOS.forEach((depto) => {
            data[depto] = {};
            IMPUESTOS.forEach((imp) => {
                data[depto][imp] = { pagado: false, monto: 0 };
            });
        });

        const rangos = IMPUESTOS.map((imp) => `'${imp}'!C${fila}`);

        await porLotes(DEPARTAMENTOS, CONCURRENCIA, async (depto) => {
            const spreadsheetId = mapaSpreadsheetIds[normalizarDepartamento(depto)];

            if (!spreadsheetId) {
                console.warn(`⚠️ No se encontró la planilla del departamento "${depto}"`);
                return;
            }

            try {
                const res = await sheets.spreadsheets.values.batchGet({
                    spreadsheetId,
                    ranges: rangos,
                });

                (res.data.valueRanges || []).forEach((rango, idx) => {
                    const imp = IMPUESTOS[idx];
                    const raw = rango.values?.[0]?.[0];
                    const monto = parsearMonto(raw);
                    data[depto][imp] = { pagado: monto > 0, monto };
                });
            } catch (error) {
                console.error(`Error leyendo la planilla de "${depto}":`, error?.message);
            }
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
