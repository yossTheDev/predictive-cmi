/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { StatisticsCard } from "@/components/StadisticsCard";
import { PredictionCharts } from "@/components/PredictionCharts";
import { addDataToBackend } from "@/actions/predictionActions";

// Field names (backend keys) with user-friendly labels
const fields: Record<string, string> = {
  PRECIO: "Precio del producto",
  COSTO: "Costo unitario",
  ROTACION: "Rotación de inventario",
  MARKETING: "Gasto en marketing",
  INGRESOS_TOTALES: "Ingresos totales actuales",
  COSTOS_OPERATIVOS: "Costos operativos",
  PRECIO_COMPETENCIA: "Precio de la competencia",
  DEMANDA_SECTORIAL: "Demanda sectorial",
  TASA_CAMBIO: "Tasa CUP/USD",
};

// Default values for the inputs in the card
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

export default function DashBoard({ initialData }: { initialData: any[] }) {
  const [rows, setRows] = useState(initialData || []); // Initial data from the backend

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
      setRows((prev) => [...prev, { ...newRow, result }]);
      setNewRow({ ...defaultRow });
    } catch (err) {
      console.error("Error al agregar fila:", err);
    }
  };

  return (
    <main className="max-w-8xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Predicción de KPIs
      </h1>

      <div className="grid md:grid-cols-2">
        {/* Table */}
        <div>
          <Table>
            <TableCaption>Datos ingresados y resultados obtenidos</TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(fields).map((key) => (
                  <TableHead key={key} className="min-w-[160px] text-xs">
                    {fields[key]}
                  </TableHead>
                ))}
                <TableHead className="min-w-[200px]">Resultado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={Object.keys(fields).length + 1}
                    className="text-center text-xs p-4"
                  >
                    No hay datos aún. Agrega uno abajo.
                  </TableCell>
                </TableRow>
              )}

              {rows.map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(fields).map((key) => (
                    <TableCell key={key} className="text-xs">
                      <p>{fields[key]}</p>
                      {row[key]}
                    </TableCell>
                  ))}

                  <TableCell className="text-xs space-y-1">
                    {row.Ventas && (
                      <>
                        <p>🔮 Ventas: {row.Ventas.toFixed(2)}</p>
                        <p>💰 Beneficio: {row.Beneficio_neto.toFixed(2)}</p>
                        <p>
                          📈 Ingresos Estimados:{" "}
                          {row.Ingresos_totales_final.toFixed(2)}
                        </p>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Card para agregar nueva fila */}
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
                    value={newRow[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleAddRow} className="mt-6 w-full">
              Agregar fila
            </Button>
          </div>
        </div>

        {/* Statistics and Charts */}
        <div className="flex flex-col gap-4">
          <StatisticsCard rows={rows} />
          <PredictionCharts rows={rows} />
        </div>
      </div>
    </main>
  );
}
