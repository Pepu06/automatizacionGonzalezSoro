"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import FormularioImpuestos from "@/app/components/FormularioImpuestos";
import DashboardButton from "@/app/components/DashboardButton";

export default function HomePage() {
    return (
        <ProtectedRoute>
            <DashboardButton />
            <FormularioImpuestos />
        </ProtectedRoute>
    );
}