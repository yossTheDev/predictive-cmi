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
    <main className="max-w-8xl mx-auto p-6">
      <Header onAddRow={handleAddRow} />

      <div className="grid md:grid-cols-2">
        {/* Table & Form */}
        <div className="grid grid-cols-1 grid-rows-2 gap-4">
          <DataTable columns={columns} data={rows} />
        </div>

        {/* Statistics and Charts */}
        <div className="grid grid-cols-1 grid-rows-2 gap-4">
          <StatisticsCard rows={rows} />
          <PredictionCharts rows={rows} />
        </div>
      </div>
    </main>
  );
}
