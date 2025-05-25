"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PredictionResult } from "@/types/result";
import { StatsCard } from "./StatsCard";
import { BarChart3, DollarSign, PiggyBank, ShoppingCart } from "lucide-react";

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
    <div className="flex flex-col flex-wrap gap-2 p-4 rounded-xl border border-neutral-200">
      <h2 className="text-2xl font-bold">Estadísticas Generales</h2>
      <div className="flex flex-wrap gap-4">
        <StatsCard
          title="Ventas"
          subtitle={average("Ventas").toFixed(2)}
          logo={<ShoppingCart className="w-6 h-6 text-primary" />}
        />

        <StatsCard
          title="Ingresos Totales"
          subtitle={average("Ingresos_totales_final").toFixed(2)}
          logo={<DollarSign className="w-6 h-6 text-primary" />}
        />

        <StatsCard
          title="Beneficio Neto"
          subtitle={average("Beneficio_neto").toFixed(2)}
          logo={<PiggyBank className="w-6 h-6 text-primary" />}
        />

        <StatsCard
          title="Total de Resultados"
          subtitle={validResults.length.toString()}
          logo={<BarChart3 className="w-6 h-6 text-primary" />}
        />
      </div>
    </div>
  );
}
