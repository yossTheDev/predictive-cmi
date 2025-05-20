"use client";

import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type PredictionResult = {
  Ventas: number;
  Beneficio_neto: number;
  Ingresos_totales_estimado: number;
};

type Row = {
  result: PredictionResult | null;
};

interface PredictionLineChartsProps {
  rows: Row[];
}

const chartConfig = {
  ventas: {
    label: "Ventas",
    color: "#2563eb",
  },
  beneficio: {
    label: "Beneficio Neto",
    color: "#16a34a",
  },
  ingresos: {
    label: "Ingresos Estimados",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function PredictionCharts({ rows }: PredictionLineChartsProps) {
  const chartData = rows
    .map(
      (row, index) =>
        row.result && {
          name: `Dato ${index + 1}`,
          ventas: row.result.Ventas,
          beneficio: row.result.Beneficio_neto,
          ingresos: row.result.Ingresos_totales_estimado,
        }
    )
    .filter(Boolean) as {
    name: string;
    ventas: number;
    beneficio: number;
    ingresos: number;
  }[];

  if (chartData.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 text-center text-sm text-gray-500">
        No hay datos para mostrar las gráficas.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[350px] max-w-3xl mx-auto mt-8 w-full"
    >
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="var(--color-ventas)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="beneficio"
            stroke="var(--color-beneficio)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="var(--color-ingresos)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
