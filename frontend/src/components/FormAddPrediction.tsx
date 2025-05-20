/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { addDataToBackend } from "@/actions/predictionActions";

// Etiquetas para mostrar en el formulario
const fields: Record<string, string> = {
  Precio_promedio: "Precio del producto",
  Costos: "Costo unitario",
  Rotacion: "Rotación de inventario",
  Marketing: "Gasto en marketing",
  Ingresos_totales: "Ingresos totales actuales",
  Costos_operativos: "Costos operativos",
  Precio_competencia: "Precio de la competencia",
  Demanda_sectorial: "Demanda sectorial",
  Tasa_CUP_USD: "Tasa CUP/USD",
};

// Mapeo de claves frontend → backend
const keyMap: Record<string, string> = {
  Precio_promedio: "PRECIO",
  Costos: "COSTO",
  Rotacion: "ROTACION",
  Marketing: "MARKETING",
  Ingresos_totales: "INGRESOS_TOTALES",
  Costos_operativos: "COSTOS_OPERATIVOS",
  Precio_competencia: "PRECIO_COMPETENCIA",
  Demanda_sectorial: "DEMANDA_SECTORIAL",
  Tasa_CUP_USD: "TASA_CAMBIO",
};

// Valores predeterminados backend
const defaultRow: Record<string, number> = {
  PRECIO: 130,
  COSTO: 45,
  ROTACION: 6.5,
  MARKETING: 15,
  INGRESOS_TOTALES: 14000,
  COSTOS_OPERATIVOS: 4800,
  PRECIO_COMPETENCIA: 108,
  DEMANDA_SECTORIAL: 1.55,
  TASA_CAMBIO: 350,
};

type Props = {
  onAddRow: (newData: any) => void;
};

export function FormAddPrediction({ onAddRow }: Props) {
  const [newRow, setNewRow] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    Object.entries(keyMap).forEach(([frontendKey, backendKey]) => {
      initial[frontendKey] = defaultRow[backendKey];
    });
    return initial;
  });

  const handleInputChange = (key: string, value: string) => {
    setNewRow((prev) => ({
      ...prev,
      [key]: value === "" ? 0 : parseFloat(value),
    }));
  };

  const handleAddRow = async () => {
    try {
      const dataForBackend: Record<string, number> = {};
      Object.entries(newRow).forEach(([frontendKey, value]) => {
        const backendKey = keyMap[frontendKey];
        dataForBackend[backendKey] = value;
      });

      const result = await addDataToBackend(dataForBackend as any);
      onAddRow({ ...dataForBackend, result });

      // Reset form a valores por defecto
      const resetRow: Record<string, number> = {};
      Object.entries(keyMap).forEach(([frontendKey, backendKey]) => {
        resetRow[frontendKey] = defaultRow[backendKey];
      });
      setNewRow(resetRow);
    } catch (err) {
      console.error("Error al agregar fila:", err);
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5" /> Agregar nueva fila
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(fields).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 font-medium">
              {fields[key]}
            </label>
            <Input
              id={key}
              type="number"
              value={newRow[key] ?? 0}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleAddRow} className="mt-6 w-full">
        Agregar fila
      </Button>
    </div>
  );
}
