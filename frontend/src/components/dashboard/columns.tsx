"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PredictionData = {
  Precio_promedio: number;
  Costos: number;
  Rotacion: number;
  Marketing: number;
  Ingresos_totales: number;
  Costos_operativos: number;
  Precio_competencia: number;
  Demanda_sectorial: number;
  Tasa_CUP_USD: number;
  Ventas?: number;
  Beneficio_neto?: number;
  Ingresos_totales_final?: number;
};

export const fields: Record<keyof PredictionData, string> = {
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

export const columns: ColumnDef<PredictionData>[] = Object.entries(fields).map(
  ([key, label]) => ({
    accessorKey: key,
    header: label,
    cell: ({ getValue }) => {
      const value = getValue() as number | undefined;
      return typeof value === "number" ? value.toFixed(2) : "-";
    },
  })
);
