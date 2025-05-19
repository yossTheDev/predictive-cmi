# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from backend.models.predict import predict_all
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    Precio: float
    Costo: float
    Rotacion: float
    Marketing: float
    Ingresos_totales: float
    Costos_operativos: float
    Precio_competencia: float
    Demanda_sectorial: float


@app.get("/")
def read_root():
    return {"message": "Welcome to the prediction API!"}


@app.post("/predict")
def predict_endpoint(data: PredictionInput):
    result = predict_all(
        Precio=data.Precio,
        Costo=data.Costo,
        Rotacion=data.Rotacion,
        Marketing=data.Marketing,
        Ingresos_totales=data.Ingresos_totales,
        Costos_operativos=data.Costos_operativos,
        Precio_competencia=data.Precio_competencia,
        Demanda_sectorial=data.Demanda_sectorial,
    )
    return result
