import { google } from "googleapis";

const SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";

const DEPARTAMENTOS = [
    "Acevedo",
    "Alsina 1138",
    "Alsina 1905",
    "Araoz",
    "Artigas",
    "Austria",
    "Av la Plata",
    "Avellaneda",
    "Ayacucho 1085",
    "Ayacucho 331",
    "Bernardo de Irigoy",
    "Berutti",
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
    "Eva Peron",
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
    "Laprida 1898",
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
    "Quirno Costa",
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
    "Yapeyu",
    "Yatay",
];

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
    "ARBA",
];

const COLUMNA_POR_IMPUESTO = {
    ABL: "B",
    ABLUC: "C",
    ARBA: "D",
    AYSA: "E",
    AYSAUC: "F",
    EDESUR: "G",
    EXPENSAS: "H",
    METROGAS: "I",
    MUNICIPAL: "J",
    TELECOM: "K",
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = searchParams.get("mes");

        if (!mes) {
            return Response.json({ error: "Mes requerido" }, { status: 400 });
        }

        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        auth.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        const sheets = google.sheets({ version: "v4", auth });

        // 🔹 Leemos todo el bloque de datos del mes
        const range = `${mes}!B2:K${DEPARTAMENTOS.length + 1}`;

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range,
        });

        const values = res.data.values || [];

        const data = {};

        DEPARTAMENTOS.forEach((depto, rowIdx) => {
            data[depto] = {};

            IMPUESTOS.forEach((imp, colIdx) => {
                const raw = values[rowIdx]?.[colIdx];
                const monto =
                    typeof raw === "string"
                        ? Number(raw.replace(/\./g, "").replace(",", ".").replace("ARS", "").trim())
                        : Number(raw) || 0;

                data[depto][imp] = {
                    pagado: monto > 0,
                    monto,
                };
            });
        });

        return Response.json({ data });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Error cargando resumen", details: err.message },
            { status: 500 }
        );
    }
}
