"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function CambiarPassword() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [passwordConfirmar, setPasswordConfirmar] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        actual: false,
        nueva: false,
        confirmar: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (passwordNueva.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (passwordNueva !== passwordConfirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/cambiar-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    departamento: user.departamento,
                    passwordActual,
                    passwordNueva,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al cambiar contraseña");
            }

            alert("✅ Contraseña actualizada exitosamente");
            setIsOpen(false);
            setPasswordActual("");
            setPasswordNueva("");
            setPasswordConfirmar("");

            // Cerrar sesión para que vuelva a iniciar con la nueva contraseña
            logout();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botón para abrir modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium border border-gray-200"
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                </svg>
                Cambiar Contraseña
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Cambiar Contraseña
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Departamento: <strong>{user?.departamento}</strong>
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Contraseña actual */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contraseña actual
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.actual ? "text" : "password"}
                                        value={passwordActual}
                                        onChange={(e) => setPasswordActual(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                actual: !showPasswords.actual,
                                            })
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.actual ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Nueva contraseña */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nueva contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.nueva ? "text" : "password"}
                                        value={passwordNueva}
                                        onChange={(e) => setPasswordNueva(e.target.value)}
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                nueva: !showPasswords.nueva,
                                            })
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.nueva ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmar contraseña */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirmar nueva contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.confirmar ? "text" : "password"}
                                        value={passwordConfirmar}
                                        onChange={(e) => setPasswordConfirmar(e.target.value)}
                                        required
                                        placeholder="Repetí la nueva contraseña"
                                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                confirmar: !showPasswords.confirmar,
                                            })
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.confirmar ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                    <p className="text-sm text-red-700 font-medium text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Botones */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}