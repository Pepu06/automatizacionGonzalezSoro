import { sheets } from "../lib/google";

const SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";
const SPREADSHEET_ID_USUARIOS = "1_73Gaqjt60-AXQq4mOowoOv5JA3ExiRQceIw6CwWgQ8";

const DEPARTAMENTOS = [
    "Acevedo", "Alsina 1138", "Alsina 1905", "Araoz", "Artigas", "Austria",
    "Av la Plata", "Avellaneda", "Ayacucho 1085", "Ayacucho 331",
    "Bernardo de Irigoyen", "Berutti", "Billinghurst", "Bulnes", "Cervantes",
    "Charcas", "Cramer", "Don Bosco", "El Potrero", "Esmeralda 3 K",
    "Esmeralda 5 A", "Esmeralda 5 D", "Eva Peron", "Formosa 129",
    "Formosa 380", "G Lorca cochera 340", "G Lorca cochera 97",
    "G Lorca piso 22", "G Lorca piso 3", "H Irigoyen", "Independencia",
    "La Rioja", "Lacarra", "Lapida 1898", "Las Heras", "Lavalle",
    "Lavalleja", "Libertad 844", "Libertad 960", "M T de Alvear",
    "Mar de las Pampas", "Mario Bravo 5 A", "Matheu 1 A", "Matheu 2 G",
    "Matheu 4 E", "Ortega y Gasset", "Paraguay 754", "Paraguay 783",
    "Pilar dormi", "Pueyrredon 1655", "Pueyrredon 1978", "Quimo Costa",
    "R Pena 10 C", "R Pena 10 D", "R Pena 2 B", "R Pena 2 C",
    "R Pena 2 D", "R Pena 3 D", "R Pena 4 C", "R Pena 4 D", "Ravignani",
    "Rawson", "Riobamba", "Rivadavia 1525", "Rivadavia 1611",
    "Rivadavia 4085", "Rivadavia 822", "Saavedra 2", "Saavedra PB",
    "San Benito", "San Juan", "Santa Fe 2545", "Scalabrini Ortiz 2364",
    "Siria 5 A", "Siria 7 27", "Talcahuano 1242", "Uruguay 14 D",
    "Uruguay 7 B", "Valle", "Vidt 2052", "Vidt 2137", "Yapeyu", "Yatay",
];

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
const DEPARTAMENTO_CANONICO_POR_NOMBRE_NORMALIZADO = DEPARTAMENTOS.reduce(
    (acc, depto) => {
        acc[normalizarDepartamento(depto)] = depto;
        return acc;
    },
    {}
);

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes");

        if (!mes) {
            return Response.json({ error: "Mes requerido" }, { status: 400 });
        }

        const range = `${mes}!A2:K`;
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

        values.forEach((row) => {
            const nombreHoja = row?.[0];
            const deptoNormalizado = normalizarDepartamento(nombreHoja);
            const deptoCanonico = DEPARTAMENTO_CANONICO_POR_NOMBRE_NORMALIZADO[deptoNormalizado];

            if (!deptoCanonico && nombreHoja) {
                console.log("⚠️ ERROR DE COINCIDENCIA:");
                console.log(`- Leído en la hoja: "${nombreHoja}"`);
                console.log(`- Normalizado como: "${deptoNormalizado}"`);
                console.log(`- ¿Existe en tu lista?: No`);
                console.log("-----------------------------------");
            }

            // Si no lo encuentra, lo salteamos (puedes poner un console.log aquí para debug)
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