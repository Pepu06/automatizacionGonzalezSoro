"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const MESES = [
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

const IMPUESTOS = [
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

export default function Dashboard() {
    const [resumen, setResumen] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState(MESES[new Date().getMonth()]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/resumen?mes=${mesSeleccionado}`);
                if (!res.ok) throw new Error("Error al cargar datos");
                const data = await res.json();
                setResumen(data);
            } catch (err) {
                console.error(err);
                alert("Error al cargar los datos del resumen");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [mesSeleccionado]);

    const getDepartamentoEstado = (departamento, impuesto) => {
        if (!resumen || !resumen.data || !resumen.data[departamento]) {
            return { pagado: false, monto: 0 };
        }
        return resumen.data[departamento][impuesto] || { pagado: false, monto: 0 };
    };

    const getColorEstado = (impuesto, departamento) => {
        const estado = getDepartamentoEstado(departamento, impuesto);

        if (estado.pagado) {
            return "bg-green-400 text-white";
        } else {
            return "bg-red-400 text-red-900";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Botón de volver */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="fixed top-2 left-4 items-center gap-2 bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        ← Volver
                    </Link>
                </div>

                {/* Encabezado */}
                <div className="bg-white rounded-lg shadow p-6 mb-6 mt-20">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        Resumen anual de Impuestos
                    </h1>

                    {/* Selector de meses */}
                    <div className="flex gap-2 flex-wrap justify-center items-center">
                        {MESES.map((mes) => (
                            <button
                                key={mes}
                                onClick={() => setMesSeleccionado(mes)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${mesSeleccionado === mes
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {mes}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contenido */}
                {loading ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600">Cargando datos...</p>
                    </div>
                ) : resumen && Object.keys(resumen.data || {}).length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-900 text-white sticky top-0">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">
                                            Departamento
                                        </th>
                                        {IMPUESTOS.map((impuesto) => (
                                            <th
                                                key={impuesto}
                                                className={`px-4 py-4 text-center font-semibold text-sm`}
                                            >
                                                <div>{impuesto}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(resumen.data)
                                        .sort()
                                        .map((departamento, idx) => (
                                            <tr
                                                key={departamento}
                                                className={`border-t ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                    } hover:bg-blue-50 transition-colors`}
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {departamento}
                                                </td>
                                                {IMPUESTOS.map((impuesto) => {
                                                    const estado = getDepartamentoEstado(
                                                        departamento,
                                                        impuesto
                                                    );

                                                    return (
                                                        <td
                                                            key={impuesto}
                                                            className={`px-4 py-4 text-center text-sm font-medium border-r ${getColorEstado(
                                                                impuesto,
                                                                departamento
                                                            )}`}
                                                        >
                                                            {estado.pagado ? (
                                                                <div>
                                                                    <div>✓</div>
                                                                    <div className="text-sm mt-1">
                                                                        ${estado.monto.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="font-bold">✗</span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600">No hay datos disponibles para este mes.</p>
                    </div>
                )}

                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Leyenda:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-400 rounded"></div>
                            <span className="text-gray-700">
                                <strong>Verde:</strong> Pagado
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-400 rounded"></div>
                            <span className="text-gray-700">
                                <strong>Rojo:</strong> No pagado (mes pasado)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded"></div>
                            <span className="text-gray-700">
                                <strong>Gris:</strong> Mes futuro
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
