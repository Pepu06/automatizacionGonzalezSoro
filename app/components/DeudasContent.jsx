"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { normalizarDepartamento } from "@/app/api/lib/normalizar";

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

export default function DeudasContent() {
    const { user, logout } = useAuth();
    const [deudores, setDeudores] = useState([]);
    const [estadisticas, setEstadisticas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviandoEmails, setEnviandoEmails] = useState(false);
    const [selectedDeudas, setSelectedDeudas] = useState({});
    const [mesSeleccionado, setMesSeleccionado] = useState(
        MESES[new Date().getMonth()]
    );

    useEffect(() => {
        cargarDeudores(mesSeleccionado);
        setSelectedDeudas({});
    }, [mesSeleccionado]);

    const cargarDeudores = async (mes) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/resumen?mes=${encodeURIComponent(mes)}`);
            if (!res.ok) throw new Error("Error al cargar datos");
            const data = await res.json();
            const resumenData = data.data || {};
            const emailsPorDepartamento = data.emails || {};

            const deudoresCalculados = Object.keys(resumenData).map(
                (departamento) => {
                    const emailReal =
                        emailsPorDepartamento[normalizarDepartamento(departamento)] ||
                        "";

                    const deudas = IMPUESTOS.filter(
                        (imp) => !resumenData[departamento]?.[imp]?.pagado
                    ).map((imp) => ({
                        mes,
                        impuesto: imp,
                    }));

                    return {
                        departamento,
                        email: emailReal,
                        deudas,
                    };
                }
            );

            const totalDeudas = deudoresCalculados.reduce(
                (sum, d) => sum + d.deudas.length,
                0
            );
            const totalDepartamentosDeudores = deudoresCalculados.filter(
                (d) => d.deudas.length > 0
            ).length;

            setDeudores(deudoresCalculados);
            setEstadisticas({
                totalDeudas,
                totalDepartamentosDeudores,
                mesActual: mes,
            });
        } catch (error) {
            console.error("Error cargando deudores:", error);
            alert("Error al cargar los deudores");
        } finally {
            setLoading(false);
        }
    };

    const toggleDeudor = (departamento) => {
        const deudor = deudoresDelMes.find(
            (d) => d.departamento === departamento
        );
        const impuestosDelMes = deudor?.deudasDelMes?.map((d) => d.impuesto) || [];
        if (impuestosDelMes.length === 0) return;

        const seleccionados = selectedDeudas[departamento] || [];
        if (seleccionados.length === impuestosDelMes.length) {
            const { [departamento]: _, ...resto } = selectedDeudas;
            setSelectedDeudas(resto);
        } else {
            setSelectedDeudas({
                ...selectedDeudas,
                [departamento]: impuestosDelMes,
            });
        }
    };

    const toggleImpuesto = (departamento, impuesto) => {
        const seleccionados = selectedDeudas[departamento] || [];
        const existe = seleccionados.includes(impuesto);
        const nuevos = existe
            ? seleccionados.filter((i) => i !== impuesto)
            : [...seleccionados, impuesto];

        if (nuevos.length === 0) {
            const { [departamento]: _, ...resto } = selectedDeudas;
            setSelectedDeudas(resto);
        } else {
            setSelectedDeudas({
                ...selectedDeudas,
                [departamento]: nuevos,
            });
        }
    };

    const deudoresDelMes = useMemo(() => {
        return deudores.map((d) => {
            const deudasDelMes = (d.deudas || []).filter(
                (deuda) => deuda.mes === mesSeleccionado
            );
            return {
                ...d,
                deudasDelMes,
                tieneDeudaMes: deudasDelMes.length > 0,
            };
        });
    }, [deudores, mesSeleccionado]);

    const departamentosConDeudaMes = useMemo(() => {
        return deudoresDelMes
            .filter((d) => d.tieneDeudaMes)
            .map((d) => d.departamento);
    }, [deudoresDelMes]);

    const totalDeudasMes = useMemo(() => {
        return deudoresDelMes.reduce((sum, d) => sum + d.deudasDelMes.length, 0);
    }, [deudoresDelMes]);

    const totalSeleccionadas = useMemo(() => {
        return Object.values(selectedDeudas).reduce(
            (sum, arr) => sum + arr.length,
            0
        );
    }, [selectedDeudas]);

    const seleccionarTodos = () => {
        if (totalSeleccionadas === totalDeudasMes) {
            setSelectedDeudas({});
            return;
        }

        const seleccion = {};
        deudoresDelMes.forEach((d) => {
            if (d.deudasDelMes.length > 0) {
                seleccion[d.departamento] = d.deudasDelMes.map((x) => x.impuesto);
            }
        });
        setSelectedDeudas(seleccion);
    };

    const enviarEmails = async () => {
        if (totalSeleccionadas === 0) {
            alert("Seleccioná al menos un impuesto");
            return;
        }

        const confirmacion = confirm(
            `¿Enviar email con ${totalSeleccionadas} impuesto(s) pendiente(s)?`
        );
        if (!confirmacion) return;

        setEnviandoEmails(true);

        try {
            const deudoresAEnviar = deudoresDelMes
                .filter((d) => selectedDeudas[d.departamento]?.length)
                .map((d) => ({
                    departamento: d.departamento,
                    email: d.email,
                    nombre: d.departamento,
                    deudas: d.deudasDelMes.filter((deuda) =>
                        selectedDeudas[d.departamento]?.includes(deuda.impuesto)
                    ),
                    mes: mesSeleccionado,
                }))
                .filter((d) => d.deudas.length > 0 && d.email);

            if (deudoresAEnviar.length === 0) {
                alert("No hay emails cargados para los impuestos seleccionados");
                setEnviandoEmails(false);
                return;
            }

            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deudores: deudoresAEnviar }),
            });

            if (!res.ok) throw new Error("Error enviando emails");

            alert("✅ Emails enviados correctamente");
            setSelectedDeudas({});
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Error al enviar los emails");
        } finally {
            setEnviandoEmails(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Botón volver */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium border border-gray-200 group"
            >
                <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Volver
            </Link>

            {/* Botón logout */}
            <button
                onClick={logout}
                className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium border border-gray-200"
            >
                <span className="text-sm">
                    <strong>{user?.departamento}</strong>
                </span>
                <div className="w-px h-5 bg-gray-300"></div>
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
                Salir
            </button>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="pt-12 pb-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Gestión de Deudores
                    </h1>
                    <p className="text-lg text-gray-600">
                        Departamentos con impuestos pendientes de meses anteriores
                    </p>
                </div>

                {/* Estadísticas */}
                {estadisticas && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Mes actual
                                    </p>
                                    <p className="text-3xl font-bold text-indigo-600">
                                        {mesSeleccionado}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Deudores del mes
                                    </p>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {departamentosConDeudaMes.length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-orange-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Total de deudas del mes
                                    </p>
                                    <p className="text-3xl font-bold text-red-600">
                                        {totalDeudasMes}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selector de meses */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Seleccioná un mes
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {MESES.map((mes) => (
                            <button
                                key={mes}
                                onClick={() => {
                                    setMesSeleccionado(mes);
                                    setSelectedDeudas({});
                                }}
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

                {/* Controles de selección */}
                {departamentosConDeudaMes.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={seleccionarTodos}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                                    disabled={departamentosConDeudaMes.length === 0}
                                >
                                    {totalSeleccionadas === totalDeudasMes
                                        ? "Deseleccionar todos"
                                        : "Seleccionar todos"}
                                </button>
                                <span className="text-sm text-gray-600">
                                    {totalSeleccionadas} de {totalDeudasMes} seleccionados
                                </span>
                            </div>

                            <button
                                onClick={enviarEmails}
                                disabled={
                                    enviandoEmails || totalSeleccionadas === 0
                                }
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {enviandoEmails ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
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
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Enviar recordatorios
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p className="text-gray-600 font-medium">Cargando deudores...</p>
                    </div>
                ) : departamentosConDeudaMes.length === 0 ? (
                    // Sin deudores
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            ¡Todo al día!
                        </h3>
                        <p className="text-gray-600">
                            No hay departamentos con deudas pendientes
                        </p>
                    </div>
                ) : (
                    // Grid de deudores
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deudoresDelMes.map((deudor) => (
                            <div
                                key={deudor.departamento}
                                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 overflow-hidden ${selectedDeudas[deudor.departamento]?.length
                                        ? "border-blue-500 ring-2 ring-blue-200"
                                        : "border-gray-100 hover:border-gray-200"
                                    }`}
                            >
                                <div className="p-6">
                                    {/* Header con checkbox */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {deudor.departamento}
                                            </h3>
                                            {deudor.email ? (
                                                <p className="text-sm text-gray-500">
                                                    {deudor.email}
                                                </p>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold">
                                                    <svg
                                                        className="w-3.5 h-3.5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.518 9.82c.75 1.334-.213 2.986-1.742 2.986H4.48c-1.53 0-2.492-1.652-1.743-2.986l5.52-9.82zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Sin email cargado
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={
                                                deudor.tieneDeudaMes &&
                                                (selectedDeudas[deudor.departamento]
                                                    ?.length || 0) ===
                                                    deudor.deudasDelMes.length
                                            }
                                            onChange={() => toggleDeudor(deudor.departamento)}
                                            disabled={!deudor.tieneDeudaMes}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>

                                    {/* Badge de cantidad de deudas */}
                                    {deudor.tieneDeudaMes ? (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold mb-4">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {deudor.deudasDelMes.length} deuda
                                            {deudor.deudasDelMes.length !== 1 ? "s" : ""}
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold mb-4">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Al día en {mesSeleccionado}
                                        </div>
                                    )}

                                    {/* Lista de deudas */}
                                    {deudor.tieneDeudaMes && (
                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {deudor.deudasDelMes.map((deuda, idx) => {
                                                const impuestoSeleccionado =
                                                    selectedDeudas[deudor.departamento]?.includes(
                                                        deuda.impuesto
                                                    ) || false;

                                                return (
                                                <div
                                                    key={idx}
                                                    onClick={() =>
                                                        toggleImpuesto(
                                                            deudor.departamento,
                                                            deuda.impuesto
                                                        )
                                                    }
                                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${impuestoSeleccionado
                                                            ? "bg-blue-50 ring-blue-200"
                                                            : "bg-gray-50 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={impuestoSeleccionado}
                                                            onClick={(event) =>
                                                                event.stopPropagation()
                                                            }
                                                            onChange={() =>
                                                                toggleImpuesto(
                                                                    deudor.departamento,
                                                                    deuda.impuesto
                                                                )
                                                            }
                                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {deuda.impuesto}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {deuda.mes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <svg
                                                        className="w-5 h-5 text-red-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}