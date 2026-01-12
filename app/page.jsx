"use client";

import { useState, useRef, useEffect } from "react";
import DashboardButton from "@/app/components/DashboardButton";
import SelectorDepartamento from "@/app/components/SelectDepto";
import SelectorImpuesto from "@/app/components/SelectImpuesto";
import SelectorMes from "@/app/components/SelectMes";

export default function Home() {
  const [formData, setFormData] = useState({
    departamento: "",
    impuesto: "",
    mes: "",
    importe: "",
    comprobante: null,
  });

  const [comprobante, setComprobante] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const procesarArchivo = (file) => {
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("El archivo no debe superar 1 MB");
      return;
    }

    setComprobante(file);

    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("departamento", formData.departamento);
    data.append("impuesto", formData.impuesto);
    data.append("mes", formData.mes);
    data.append("importe", formData.importe);

    if (comprobante) {
      data.append("comprobante", comprobante);
    }

    try {
      const res = await fetch("/api/impuestos", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Error");

      alert("Guardado en Sheets + Drive 🚀");

      // 🔄 reset total
      setFormData({
        departamento: "",
        impuesto: "",
        mes: "",
        importe: "",
      });

      setComprobante(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Algo falló 😬");
    } finally {
      setLoading(false);
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
            <SelectorDepartamento
              value={formData.departamento}
              onChange={(v) =>
                setFormData({ ...formData, departamento: v })
              } />
          </div>

          {/* Impuesto */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Impuesto <span className="text-red-600">*</span>
            </label>
            <SelectorImpuesto
              value={formData.impuesto}
              onChange={(v) =>
                setFormData({ ...formData, impuesto: v })
              }
            />
          </div>

          {/* Mes */}
          <div className="bg-gray-50 rounded-lg p-6">
            <label className="block text-base font-normal text-gray-900 mb-3">
              Mes <span className="text-red-600">*</span>
            </label>
            <SelectorMes
              value={formData.mes} onChange={(v) =>
                setFormData({ ...formData, mes: v })
              } />
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
              Arrastrá un archivo o hacé click. Máx: 1 MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => procesarArchivo(e.target.files?.[0])}
            />

            {/* ZONA VISIBLE */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                procesarArchivo(e.dataTransfer.files?.[0]);
              }}
              className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-colors
      ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
    `}
            >
              {preview ? (
                comprobante?.type === "application/pdf" ? (
                  <div className="flex flex-col items-center gap-3">
                    <iframe
                      src={preview}
                      className="w-full h-64 border rounded"
                      title="PDF preview"
                    />
                    <p className="text-sm text-gray-600">
                      Vista previa del PDF — click para cambiar
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 rounded shadow"
                    />
                    <p className="text-sm text-gray-600">
                      Click para cambiar imagen
                    </p>
                  </div>
                )
              ) : (
                <p className="text-gray-600">
                  📎 Arrastrá un archivo o hacé click
                </p>
              )}
            </div>
          </div>

          {/* Botón de envío */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors
    ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"}
  `}
            >
              {loading ? "Guardando..." : "Enviar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
