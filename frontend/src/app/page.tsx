"use client";

import { useState } from "react";
import axios from "axios";
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

// Default editable row (backend field names)
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

type Row = typeof defaultRow & { result: any | null };

export default function Home() {
  const [rows, setRows] = useState<Row[]>([{ ...defaultRow, result: null }]);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = parseFloat(value);
    setRows(updatedRows);
  };

  const handleAddRow = async () => {
    try {
      const { result, ...editRow } = defaultRow;
      console.log("editRow", editRow);
      const { data } = await axios.post(
        "http://localhost:8000/predict",
        editRow
      );
      setRows([...rows, { ...editRow, result: data }]);
    } catch (err) {
      console.error("Error al predecir:", err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Predicción de KPIs
      </h1>

      <Button onClick={handleAddRow} className="mb-4 flex gap-2 items-center">
        <PlusCircle className="w-5 h-5" />
        Agregar Fila
      </Button>

      <Table>
        <TableCaption>
          Introduce los datos y obtén la predicción automáticamente.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {Object.keys(fields).map((key) => (
              <TableHead key={key} className="min-w-[160px]">
                {fields[key]}
              </TableHead>
            ))}
            <TableHead className="min-w-[200px]">Resultado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(fields).map((key) => (
                <TableCell key={key}>
                  <Input
                    type="number"
                    value={row[key]}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                    className="w-32"
                  />
                </TableCell>
              ))}
              <TableCell className="text-xs space-y-1">
                {row.result && (
                  <>
                    <p>🔮 Ventas: {parseFloat(row.result.Ventas).toFixed(2)}</p>
                    <p>
                      💰 Beneficio:{" "}
                      {parseFloat(row.result.Beneficio_neto).toFixed(2)}
                    </p>
                    <p>
                      📈 Ingresos Estimados:{" "}
                      {parseFloat(row.result.Ingresos_totales_estimado).toFixed(
                        2
                      )}
                    </p>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
