# src/predictive_cmi/train.py

import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib


def train_model():
    # Historical sample data
    data = {
        "Ingresos_totales": [
            10000,
            11000,
            10500,
            12000,
            12500,
            13000,
            13500,
            14000,
            14500,
            15000,
        ],
        "Costos_operativos": [
            4000,
            4200,
            4100,
            4300,
            4400,
            4500,
            4600,
            4700,
            4800,
            4900,
        ],
        "Beneficio_neto": [2000, 2100, 2050, 2200, 2300, 2400, 2500, 2600, 2700, 2800],
        # Market data
        "Precio_competencia": [95, 97, 98, 100, 102, 104, 105, 106, 108, 110],
        "Demanda_sectorial": [1.2, 1.3, 1.25, 1.35, 1.4, 1.45, 1.5, 1.52, 1.55, 1.6],
        # Internal data
        "Precio_promedio": [100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
        "Costos": [40, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        "Rotacion": [5, 5.5, 6, 6.2, 6.5, 6.8, 7, 7.2, 7.5, 7.8],
        "Marketing": [10, 11, 12, 13, 14, 15, 16, 16, 17, 18],
        "Ventas": [500, 520, 540, 560, 580, 600, 620, 630, 650, 670],
    }

    df = pd.DataFrame(data)

    X = df[["Precio_promedio", "Costos", "Rotacion", "Marketing"]]
    y = df["Ventas"]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, "modelo_regresion.pkl")
    print("✅ Modelo entrenado y guardado en 'modelo_regresion.pkl'")


if __name__ == "__main__":
    train_model()
