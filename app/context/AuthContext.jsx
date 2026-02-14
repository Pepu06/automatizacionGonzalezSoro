"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (departamento) => {
        const userData = { departamento };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};