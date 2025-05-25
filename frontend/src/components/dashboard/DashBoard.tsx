"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatisticsCard } from "@/components/StadisticsCard";
import { PredictionCharts } from "@/components/PredictionCharts";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export default function DashBoard({ initialData }: { initialData: any[] }) {
  const rows = initialData;

  return (
    <main className="my-auto mt-10 h-fit flex flex-col p-2 border border-neutral-200">
      <div className="flex gap-8 p-4">
        {/* Table & Form */}
        <div className="flex flex-col w-1/2 gap-4 rounded-xl border border-neutral-200 h-fit p-8">
          <h3 className="text-2xl font-bold">Datos</h3>
          <DataTable columns={columns} data={rows} />
        </div>

        {/* Statistics and Charts */}
        <div className="flex flex-col w-1/2 gap-4">
          <StatisticsCard rows={rows} />

          <div className="flex flex-col w-full gap-4 rounded-xl border border-neutral-200 h-fit p-8">
            <h3 className="text-2xl font-bold">Gráficas</h3>
            <p className="text-sm text-muted-foreground">
              Gráficas de Predicción de Ventas, Beneficios e Ingresos
            </p>
            <PredictionCharts rows={rows} />
          </div>
        </div>
      </div>
    </main>
  );
}
