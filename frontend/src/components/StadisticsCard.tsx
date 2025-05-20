"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PredictionResult } from "@/types/result";

interface StatisticsCardProps {
  rows: PredictionResult[];
}

export function StatisticsCard({ rows }: StatisticsCardProps) {
  const validResults = rows.map((r) => ({
    Ventas: r!.Ventas,
    Ingresos_totales_final: r!.Ingresos_totales_final,
    Beneficio_neto: r!.Beneficio_neto,
  }));

  if (validResults.length === 0) {
    return (
      <Card className="max-w-3xl mx-auto mt-8 p-6">
        <CardHeader>
          <CardTitle>📊 Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>No hay datos para mostrar estadísticas.</CardContent>
      </Card>
    );
  }

  const average = (key: keyof PredictionResult) =>
    validResults.reduce((sum, r) => sum + r[key], 0) / validResults.length;

  return (
    <Card className="max-w-3xl mx-auto mt-8 p-6">
      <CardHeader>
        <CardTitle>📊 Estadísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>🔮 Promedio de Ventas: {average("Ventas").toFixed(2)}</li>
          <li>
            💰 Promedio de Beneficio Neto:{" "}
            {average("Beneficio_neto").toFixed(2)}
          </li>
          <li>
            📈 Promedio de Ingresos Estimados:{" "}
            {average("Ingresos_totales_final").toFixed(2)}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
