/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { addDataToBackend } from "@/actions/predictionActions";
import { PredictionData } from "@/types/predictionData";

const fields: Record<keyof PredictionData, string> = {
  Precio_promedio: "Precio del producto",
  Costos: "Costo unitario",
  Rotacion: "Rotación de inventario",
  Marketing: "Gasto en marketing",
  Ingresos_totales: "Ingresos totales actuales",
  Costos_operativos: "Costos operativos",
  Precio_competencia: "Precio de la competencia",
  Demanda_sectorial: "Demanda sectorial",
  Tasa_CUP_USD: "Tasa CUP/USD",
  Ventas: "Ventas",
  Beneficio_neto: "Beneficio neto",
  Ingresos_totales_final: "Ingresos totales estimados",
};

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
  const [newRow, setNewRow] = useState<typeof defaultRow>({ ...defaultRow });

  const handleInputChange = (key: string, value: string) => {
    setNewRow((prev) => ({
      ...prev,
      [key]: value === "" ? 0 : parseFloat(value),
    }));
  };

  const handleAddRow = async () => {
    try {
      const result = await addDataToBackend(newRow as any);
      onAddRow({ ...newRow, result });
      setNewRow({ ...defaultRow });
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
              {fields[key as keyof PredictionData]}
            </label>
            <Input
              id={key}
              type="number"
              value={newRow[key as keyof typeof newRow]}
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
