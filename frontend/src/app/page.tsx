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
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultRow = {
  Precio: 130,
  Costo: 45,
  Rotacion: 6.5,
  Marketing: 15,
  Ingresos_totales: 14000,
  Costos_operativos: 4800,
  Precio_competencia: 108,
  Demanda_sectorial: 1.55,
  Tasa_CUP_USD: 350,
};

export default function Home() {
  const [rows, setRows] = useState([{ ...defaultRow, result: null }]);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = parseFloat(value);
    setRows(updatedRows);
  };

  const handlePredict = async (index: number) => {
    const { result, ...inputData } = rows[index];
    try {
      const res = await axios.post("http://localhost:8000/predict", inputData);
      const updatedRows = [...rows];
      updatedRows[index].result = res.data;
      setRows(updatedRows);
    } catch (err) {
      console.error("Error al predecir:", err);
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { ...defaultRow, result: null }]);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Predicción de KPIs
      </h1>

      <Button onClick={handleAddRow} className="mb-4">
        ➕ Agregar Fila
      </Button>

      <Table>
        <TableCaption>Introduce los datos y obtén la predicción.</TableCaption>
        <TableHeader>
          <TableRow>
            {Object.keys(defaultRow).map((key) => (
              <TableHead key={key} className="min-w-[120px]">
                {key}
              </TableHead>
            ))}
            <TableHead className="min-w-[100px]">Acciones</TableHead>
            <TableHead className="min-w-[200px]">Resultado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.entries(defaultRow).map(([key]) => (
                <TableCell key={key}>
                  <Input
                    type="number"
                    value={row[key]}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                    className="w-28"
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => handlePredict(index)}>Predecir</Button>
              </TableCell>
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
