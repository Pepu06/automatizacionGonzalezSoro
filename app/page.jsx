"use client";

import { useState, useRef } from "react";
import DashboardButton from "@/app/components/DashboardButton";
import SelectorDepartamento from "@/app/components/SelectDepto";
import SelectorImpuesto from "@/app/components/SelectImpuesto";
import SelectorMes from "@/app/components/SelectMes";

export default function Home() {
  const [resetKey, setResetKey] = useState(0);

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

  const eliminarArchivo = (e) => {
    e.stopPropagation();
    setComprobante(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("RESPUESTA BACKEND:", text);

      if (!res.ok) {
        throw new Error(text);
      }

      alert("✅ Guardado exitosamente en Sheets + Drive");

      setFormData({
        departamento: "",
        impuesto: "",
        mes: "",
        importe: "",
      });

      setComprobante(null);
      setPreview(null);
      setResetKey((prev) => prev + 1);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardButton />

      {/* Header */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestión de Impuestos
          </h1>
          <p className="text-lg text-gray-600">
            Cargá los impuestos de manera simple y organizada
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="px-4 pb-12">
        <main className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Grid de 2 columnas para Departamento e Impuesto */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Departamento */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Departamento <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <SelectorDepartamento
                        key={resetKey}
                        value={formData.departamento}
                        onChange={(v) =>
                          setFormData({ ...formData, departamento: v })
                        }
                      />
                    </div>
                  </div>

                  {/* Impuesto */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Impuesto <span className="text-red-500">*</span>
                    </label>
                    <SelectorImpuesto
                      key={resetKey}
                      value={formData.impuesto}
                      onChange={(v) =>
                        setFormData({ ...formData, impuesto: v })
                      }
                    />
                  </div>
                </div>

                {/* Grid de 2 columnas para Mes e Importe */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Mes <span className="text-red-500">*</span>
                    </label>
                    <SelectorMes
                      key={resetKey}
                      value={formData.mes}
                      onChange={(v) =>
                        setFormData({ ...formData, mes: v })
                      }
                    />
                  </div>

                  {/* Importe */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Importe (ARS) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        $
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="0.00"
                        value={formData.importe}
                        onChange={(e) =>
                          setFormData({ ...formData, importe: e.target.value })
                        }
                        className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Incluí centavos si corresponde (ej: 1250.75)
                    </p>
                  </div>
                </div>

                {/* Separador visual */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-500 bg-white">
                      Comprobante (opcional)
                    </span>
                  </div>
                </div>

                {/* Comprobante de Pago */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => procesarArchivo(e.target.files?.[0])}
                  />

                  {preview ? (
                    // VISTA PREVIA MOSTRADA SIEMPRE
                    <div className="space-y-4">
                      {comprobante?.type === "application/pdf" ? (
                        // Preview PDF
                        <div className="relative border-2 border-green-300 rounded-2xl overflow-hidden bg-white">
                          <iframe
                            src={preview}
                            className="w-full h-96"
                            title="Vista previa PDF"
                          />
                          <div className="absolute top-3 right-3">
                            <button
                              type="button"
                              onClick={eliminarArchivo}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-colors"
                              title="Eliminar archivo"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Preview Imagen
                        <div className="relative border-2 border-green-300 rounded-2xl overflow-hidden bg-gray-50 p-4">
                          <img
                            src={preview}
                            alt="Vista previa"
                            className="w-full h-auto max-h-96 object-contain rounded-xl"
                          />
                          <div className="absolute top-6 right-6">
                            <button
                              type="button"
                              onClick={eliminarArchivo}
                              className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl shadow-lg transition-colors"
                              title="Eliminar archivo"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Info del archivo */}
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {comprobante?.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {(comprobante?.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Cambiar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // ZONA DE ARRASTRAR (solo cuando no hay archivo)
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
                      className={`cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
                        ${dragging
                          ? "border-blue-400 bg-blue-50 scale-[1.02]"
                          : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                        }
                      `}
                    >
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-700 mb-1">
                            Arrastrá tu archivo aquí
                          </p>
                          <p className="text-sm text-gray-500">
                            o hacé click para seleccionar
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                          <span>PDF, JPG, PNG</span>
                          <span>•</span>
                          <span>Máx. 1 MB</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 transform
                      ${loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      }
                    `}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </span>
                    ) : (
                      "Cargar Impuesto"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Los datos se guardan automáticamente en Google Sheets
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}