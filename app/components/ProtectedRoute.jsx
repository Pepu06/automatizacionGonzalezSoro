"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return children;
}