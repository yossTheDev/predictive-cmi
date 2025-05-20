# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from backend.models.predict import predict_all
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from backend.models.train import train_model

app = FastAPI()

# Allow CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    PRECIO: float
    COSTO: float
    ROTACION: float
    MARKETING: float
    INGRESOS_TOTALES: float
    COSTOS_OPERATIVOS: float
    PRECIO_COMPETENCIA: float
    DEMANDA_SECTORIAL: float
    TASA_CAMBIO: float


@app.get("/")
def read_root():
    return {"message": "Welcome to the prediction API!"}


@app.post("/predict")
def predict_endpoint(data: PredictionInput):
    result = predict_all(
        Precio=data.PRECIO,
        Costo=data.COSTO,
        Rotacion=data.ROTACION,
        Marketing=data.MARKETING,
        Ingresos_totales=data.INGRESOS_TOTALES,
        Costos_operativos=data.COSTOS_OPERATIVOS,
        Precio_competencia=data.PRECIO_COMPETENCIA,
        Demanda_sectorial=data.DEMANDA_SECTORIAL,
        Tasa_CUP_USD=data.TASA_CAMBIO,
    )
    return result


@app.post("/add-data")
def add_data(data: PredictionInput):
    prediction = predict_all(
        Precio=data.PRECIO,
        Costo=data.COSTO,
        Rotacion=data.ROTACION,
        Marketing=data.MARKETING,
        Ingresos_totales=data.INGRESOS_TOTALES,
        Costos_operativos=data.COSTOS_OPERATIVOS,
        Precio_competencia=data.PRECIO_COMPETENCIA,
        Demanda_sectorial=data.DEMANDA_SECTORIAL,
        Tasa_CUP_USD=data.TASA_CAMBIO,
    )

    new_row = {
        "Precio_promedio": data.PRECIO,
        "Costos": data.COSTO,
        "Rotacion": data.ROTACION,
        "Marketing": data.MARKETING,
        "Ingresos_totales": data.INGRESOS_TOTALES,
        "Costos_operativos": data.COSTOS_OPERATIVOS,
        "Precio_competencia": data.PRECIO_COMPETENCIA,
        "Demanda_sectorial": data.DEMANDA_SECTORIAL,
        "Tasa_CUP_USD": data.TASA_CAMBIO,
        "Ventas": prediction["Ventas"],
        "Beneficio_neto": prediction["Beneficio_neto"],
        "Ingresos_totales_final": prediction["Ingresos_totales_estimado"],
    }

    df_new = pd.DataFrame([new_row])
    df_new.to_csv("data.csv", mode="a", header=False, index=False)

    train_model()

    return new_row
