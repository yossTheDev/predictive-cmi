"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { StatisticsCard } from "@/components/StadisticsCard";
import { PredictionCharts } from "@/components/PredictionCharts";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { Header } from "../Header";

export default function DashBoard({ initialData }: { initialData: any[] }) {
  const [rows, setRows] = useState(initialData || []);

  const handleAddRow = (newData: any) => {
    setRows((prev) => [...prev, newData]);
  };

  return (
    <main className="my-auto mx-8 h-fit flex flex-col  box-content p-12 rounded-xl border border-neutral-200">
      <Header onAddRow={handleAddRow} />

      <div className="flex">
        {/* Table & Form */}
        <div className="grid h-full grid-cols-1 gap-4">
          <DataTable columns={columns} data={rows} />
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
