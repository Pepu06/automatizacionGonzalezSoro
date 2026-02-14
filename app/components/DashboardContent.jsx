"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/app/components/ProtectedRoute";

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
            return "bg-emerald-500 text-white shadow-sm";
        } else {
            return "bg-red-100 text-red-700";
        }
    };

    // Calcular totales
    const calcularTotalMes = () => {
        if (!resumen || !resumen.data) return 0;
        let total = 0;
        Object.keys(resumen.data).forEach((depto) => {
            Object.keys(resumen.data[depto]).forEach((imp) => {
                if (resumen.data[depto][imp].pagado) {
                    total += resumen.data[depto][imp].monto;
                }
            });
        });
        return total;
    };

    const calcularPagados = () => {
        if (!resumen || !resumen.data) return 0;
        let count = 0;
        Object.keys(resumen.data).forEach((depto) => {
            Object.keys(resumen.data[depto]).forEach((imp) => {
                if (resumen.data[depto][imp].pagado) count++;
            });
        });
        return count;
    };

    const totalMes = calcularTotalMes();
    const cantidadPagados = calcularPagados();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Botón de volver */}
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium border border-gray-200 group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </Link>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="pt-12 pb-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Dashboard de Impuestos
                        </h1>
                        <p className="text-lg text-gray-600">
                            Visualizá el estado de todos los pagos por mes
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {resumen && Object.keys(resumen.data || {}).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Total del mes</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            ${totalMes.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Impuestos pagados</p>
                                        <p className="text-3xl font-bold text-emerald-600">{cantidadPagados}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Mes actual</p>
                                        <p className="text-3xl font-bold text-indigo-600">{mesSeleccionado}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Selector de meses */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Seleccioná un mes</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {MESES.map((mes) => (
                                <button
                                    key={mes}
                                    onClick={() => setMesSeleccionado(mes)}
                                    className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${mesSeleccionado === mes
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                                        }`}
                                >
                                    {mes}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tabla de datos */}
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                            <p className="text-gray-600 font-medium">Cargando datos...</p>
                        </div>
                    ) : resumen && Object.keys(resumen.data || {}).length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                                        <tr>
                                            <th className="px-6 py-5 text-left font-bold text-base sticky left-0 bg-gray-900 z-10">
                                                Departamento
                                            </th>
                                            {IMPUESTOS.map((impuesto) => (
                                                <th
                                                    key={impuesto}
                                                    className="px-4 py-5 text-center font-bold text-sm whitespace-nowrap"
                                                >
                                                    {impuesto}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {Object.keys(resumen.data)
                                            .sort()
                                            .map((departamento, idx) => (
                                                <tr
                                                    key={departamento}
                                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                        } hover:bg-blue-50 transition-colors`}
                                                >
                                                    <td className="px-6 py-4 font-bold text-gray-900 sticky left-0 bg-inherit z-10 border-r border-gray-200">
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
                                                                className="px-3 py-3 text-center"
                                                            >
                                                                {estado.pagado ? (
                                                                    <div className={`inline-flex flex-col items-center justify-center px-4 py-2.5 rounded-xl ${getColorEstado(impuesto, departamento)} min-w-[80px]`}>
                                                                        <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-xs font-bold">
                                                                            ${estado.monto.toFixed(2)}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${getColorEstado(impuesto, departamento)}`}>
                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
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
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                No hay datos disponibles
                            </h3>
                            <p className="text-gray-600">
                                No se encontraron registros para {mesSeleccionado}
                            </p>
                        </div>
                    )}

                    {/* Leyenda */}
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Leyenda
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-900 block">Pagado</span>
                                    <span className="text-sm text-gray-600">Impuesto abonado correctamente</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-900 block">No pagado</span>
                                    <span className="text-sm text-gray-600">Impuesto pendiente de pago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}