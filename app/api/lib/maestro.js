import { sheets } from "./google";

const MAESTRO_SPREADSHEET_ID = "1usBD--9MjH-u1Eg5zCHb_TCmlb2h1SHP5uhzsdxEFqQ";

// Orden de columnas B..K en la planilla maestra (columna A = departamento).
// Debe coincidir con el orden que lee /api/resumen.
const IMPUESTOS_MAESTRO = [
    "EDESUR", "AYSA", "METROGAS", "ABL", "EXPENSAS", "TELECOM",
    "AYSAUC", "ABLUC", "MUNICIPAL", "ARBA",
];

const normalizarDepartamento = (valor) =>
    (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();

// Refleja en la planilla maestra el importe cargado por el formulario.
// Si el departamento todavía no tiene fila en la pestaña del mes, la agrega,
// así nunca hay que tocar la maestra a mano al crear un departamento nuevo.
export async function actualizarMaestro({ departamento, impuesto, mes, importe }) {
    const indiceImpuesto = IMPUESTOS_MAESTRO.indexOf(impuesto);
    if (indiceImpuesto === -1) {
        throw new Error(`Impuesto desconocido para la maestra: "${impuesto}"`);
    }

    // B = índice 0, C = 1, ... K = 9
    const columna = String.fromCharCode("B".charCodeAt(0) + indiceImpuesto);

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: MAESTRO_SPREADSHEET_ID,
        range: `${mes}!A2:A500`,
    });

    const nombres = res.data.values || [];
    const buscado = normalizarDepartamento(departamento);
    const indiceFila = nombres.findIndex(
        (row) => normalizarDepartamento(row?.[0]) === buscado
    );

    if (indiceFila !== -1) {
        const fila = indiceFila + 2;
        await sheets.spreadsheets.values.update({
            spreadsheetId: MAESTRO_SPREADSHEET_ID,
            range: `${mes}!${columna}${fila}`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [[importe]] },
        });
        return { fila, columna, creado: false };
    }

    const filaNueva = new Array(IMPUESTOS_MAESTRO.length + 1).fill("");
    filaNueva[0] = departamento;
    filaNueva[indiceImpuesto + 1] = importe;

    await sheets.spreadsheets.values.append({
        spreadsheetId: MAESTRO_SPREADSHEET_ID,
        range: `${mes}!A2:K`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [filaNueva] },
    });
    return { columna, creado: true };
}
