# src/predictive_cmi/predict.py

import joblib
import numpy as np


def predict(Precio, Costo, Rotacion, Marketing):
    model = joblib.load("modelo_regresion.pkl")
    entrada = np.array([[Precio, Costo, Rotacion, Marketing]])
    pred = model.predict(entrada)
    return pred[0]


if __name__ == "__main__":
    resultado = predict(135, 48, 8, 17)
    print(f"🔮 Predicción de ventas: {resultado:.2f}")
