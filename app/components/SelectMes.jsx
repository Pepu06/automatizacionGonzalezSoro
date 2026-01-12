"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
    ssr: false,
});

const meses = [
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

const opcionesMeses = meses.map(d => ({
    value: d,
    label: d,
}));

export default function SelectorMes({ value, onChange }) {
    return (
        <Select
            options={opcionesMeses}
            value={opcionesMeses.find(o => o.value === value)}
            onChange={(opt) => onChange(opt.value)}
            placeholder="Buscar mes..."
            isClearable
            isSearchable
            className="text-black"
        />
    );
}
