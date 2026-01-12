"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const impuestos = [
    "ABL",
    "ABLUC",
    "ARBA",
    "AYSA",
    "AYSAUC",
    "EDESUR",
    "EXPENSAS",
    "METROGAS",
    "MUNICIPAL",
    "TELECOM",
  ];

const opcionesImpuestos = impuestos.map(d => ({
  value: d,
  label: d,
}));

export default function SelectorImpuesto({ value, onChange }) {
  return (
    <Select
      options={opcionesImpuestos}
      value={opcionesImpuestos.find(o => o.value === value)}
      onChange={(opt) => onChange(opt.value)}
      placeholder="Buscar impuesto..."
      isClearable
      isSearchable
      className="text-black"
    />
  );
}
