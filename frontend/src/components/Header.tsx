"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormAddPrediction } from "./FormAddPrediction";

type HeaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddRow: (newData: any) => void;
};

export function Header({ onAddRow }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 bg-white border-b shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Predicciones KPIs</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Agregar fila
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agregar nuevos datos</DialogTitle>
          </DialogHeader>
          <FormAddPrediction
            onAddRow={(data) => {
              onAddRow(data);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
