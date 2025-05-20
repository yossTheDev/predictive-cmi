"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputs, setInputs] = useState({
    Precio: 130,
    Costo: 45,
    Rotacion: 6.5,
    Marketing: 15,
    Ingresos_totales: 14000,
    Costos_operativos: 4800,
    Precio_competencia: 108,
    Demanda_sectorial: 1.55,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handlePredict = async () => {
    const res = await axios.post("http://localhost:8000/predict", inputs);
    setResult(res.data);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📈 Predicción de KPIs</h1>

      {Object.entries(inputs).map(([key, val]) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-semibold">{key}</label>
          <input
            name={key}
            type="number"
            value={val}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      ))}

      <button
        onClick={handlePredict}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predecir
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>🔮 Ventas: {result.Ventas.toFixed(2)}</p>
          <p>💰 Beneficio Neto: {result.Beneficio_neto.toFixed(2)}</p>
          <p>📈 Ingresos Totales: {result.Ingresos_totales.toFixed(2)}</p>
        </div>
      )}
    </main>
  );
}
