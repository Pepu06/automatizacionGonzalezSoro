"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const departamentos = [
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

const opcionesDepartamentos = departamentos.map(d => ({
  value: d,
  label: d,
}));

export default function SelectorDepartamento({ value, onChange }) {
  return (
    <Select
      options={opcionesDepartamentos}
      value={opcionesDepartamentos.find(o => o.value === value)}
      onChange={(opt) => onChange(opt.value)}
      placeholder="Buscar departamento…"
      isClearable
      isSearchable
      className="text-black"
    />
  );
}
