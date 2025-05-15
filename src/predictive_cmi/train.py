# src/predictive_cmi/train.py

import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib


def train_model():
    # Historical sample data
    data = {
        "Precio_promedio": [100, 110, 105, 115, 120, 125, 130],
        "Costos": [40, 42, 41, 43, 44, 45, 47],
        "Rotacion": [5, 6, 5.5, 6.2, 6.5, 7, 7.5],
        "Marketing": [10, 12, 11, 13, 14, 15, 16],
        "Ventas": [500, 550, 530, 580, 600, 620, 650],
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
