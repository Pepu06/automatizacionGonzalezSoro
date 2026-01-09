"use client";

import { useState } from "react";
import DashboardButton from "@/app/components/DashboardButton";


export default function Home() {
  const [formData, setFormData] = useState({
    departamento: "",
    impuesto: "",
    mes: "",
    importe: "",
    comprobante: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("departamento", formData.departamento);
    data.append("impuesto", formData.impuesto);
    data.append("mes", formData.mes);
    data.append("importe", formData.importe);

    if (formData.comprobante) {
      data.append("comprobante", formData.comprobante);
    }

    try {
      const res = await fetch("/api/impuestos", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Error");

      alert("Guardado en Sheets + Drive 🚀");
    } catch (err) {
      console.error(err);
      alert("Algo falló 😬");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("El archivo no debe superar 1 MB");
        return;
      }
      setFormData({ ...formData, comprobante: file });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4">
      <DashboardButton />
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Departamento */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Departamento <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.departamento}
              onChange={(e) =>
                setFormData({ ...formData, departamento: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1.5rem",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">Elige</option>
              {departamentos.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Impuesto */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Impuesto <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.impuesto}
              onChange={(e) =>
                setFormData({ ...formData, impuesto: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1.5rem",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">Elige</option>
              {impuestos.map((imp) => (
                <option key={imp} value={imp}>
                  {imp}
                </option>
              ))}
            </select>
          </div>

          {/* Mes */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Mes <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.mes}
              onChange={(e) =>
                setFormData({ ...formData, mes: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5rem 1.5rem",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">Elige</option>
              {meses.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>

          {/* Importe */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Importe exacto (por favor incluir hasta las centésimas) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Tu respuesta"
              value={formData.importe}
              onChange={(e) =>
                setFormData({ ...formData, importe: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border-b-2 border-gray-400 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Comprobante de Pago */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-2">
              Comprobante de Pago
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Sube 1 archivo compatible. Tamaño máximo: 1 MB.
            </p>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-blue-600 text-blue-600 rounded cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Añadir archivo
              </label>
              {formData.comprobante && (
                <p className="mt-2 text-sm text-gray-700">
                  Archivo seleccionado: {formData.comprobante.name}
                </p>
              )}
            </div>
          </div>

          {/* Botón de envío */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
