export const MESES = [
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
    "Diciembre",
];

// cada año ocupa 15 filas
export const FILA_INICIAL_POR_ANIO = {
    2025: 5,
    2026: 20,
    2027: 35,
    2028: 50,
    2029: 65,
    2030: 80,
};

export function obtenerAnioDelImpuesto(mesSeleccionado) {
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth(); // 0 = enero

    const indiceMes = MESES.indexOf(mesSeleccionado);
    if (indiceMes === -1) return null;

    return indiceMes > mesActual ? anioActual - 1 : anioActual;
}

export function obtenerFila(anio, mes) {
    const filaBase = FILA_INICIAL_POR_ANIO[anio];
    if (!filaBase) return null;

    const indiceMes = MESES.indexOf(mes);
    if (indiceMes === -1) return null;

    return filaBase + indiceMes;
}
