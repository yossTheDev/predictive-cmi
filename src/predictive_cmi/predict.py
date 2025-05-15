# src/predictive_cmi/predict.py
"""
This module provides a function to make sales predictions using a pre-trained regression model.
Functions:
----------
- predict(Precio, Costo, Rotacion, Marketing):
    Predicts sales based on input features: average price, costs, rotation, and marketing investment.
Usage:
------
The `predict` function can be used to estimate sales by providing the required input features.
The script can also be executed directly to test the prediction with sample inputs.
"""

import joblib
import pandas as pd


def predict(Precio, Costo, Rotacion, Marketing):
    # Load the trained model
    model = joblib.load("modelo_regresion.pkl")

    # Create input as a DataFrame with correct feature names
    entrada = pd.DataFrame(
        [
            {
                "Precio_promedio": Precio,
                "Costos": Costo,
                "Rotacion": Rotacion,
                "Marketing": Marketing,
            }
        ]
    )

    # Predict using the model
    pred = model.predict(entrada)
    return pred[0]


if __name__ == "__main__":
    resultado = predict(135, 48, 8, 17)
    print(f"🔮 Predicción de ventas: {resultado:.2f}")
