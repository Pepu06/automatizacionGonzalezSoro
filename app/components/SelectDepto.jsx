"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

export default function SelectorDepartamento({ value, onChange }) {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDepartamentos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/departamentos");
        const data = await response.json();
        
        if (data.success) {
          setDepartamentos(data.departamentos);
        } else {
          setError(data.error || "Error al cargar departamentos");
        }
      } catch (err) {
        console.error("Error al cargar departamentos:", err);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    cargarDepartamentos();
  }, []);

  const opcionesDepartamentos = departamentos.map(d => ({
    value: d,
    label: d,
  }));

  if (loading) {
    return (
      <div className="text-gray-400 p-2">
        Cargando departamentos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-2">
        Error: {error}
      </div>
    );
  }

  return (
    <Select
      options={opcionesDepartamentos}
      value={opcionesDepartamentos.find(o => o.value === value)}
      onChange={(opt) => onChange(opt?.value || "")}
      placeholder="Buscar departamento…"
      isClearable
      isSearchable
      className="text-black"
    />
  );
}
