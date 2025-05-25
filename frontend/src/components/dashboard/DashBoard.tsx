"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatisticsCard } from "@/components/StadisticsCard";
import { PredictionCharts } from "@/components/PredictionCharts";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FormAddPrediction } from "../FormAddPrediction";

export default function DashBoard({ initialData }: { initialData: any[] }) {
  const [open, setOpen] = useState(false);
  const rows = initialData;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="flex mx-auto mt-4 items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar fila
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agregar nuevos datos</DialogTitle>
          </DialogHeader>
          <FormAddPrediction
            onAddRow={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <main className="my-auto rounded-xl mx-8 mb-8 p-4 items-center justify-center mt-10 h-fit flex flex-col border border-neutral-200">
        <div className="grid gap-4 grid-cols-2">
          {/* Table & Form */}
          <div className="flex flex-col w-full gap-4 rounded-xl border border-neutral-200 h-fit p-8">
            <h3 className="text-2xl font-bold">Datos</h3>
            <DataTable columns={columns} data={rows} />
          </div>

          {/* Statistics and Charts */}
          <div className="flex flex-col w-full gap-4">
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
    </>
  );
}
