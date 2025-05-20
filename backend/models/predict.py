"""
This module provides functions to make predictions using a multi-output regression model.
Functions:
----------
- predict_all(...): Returns predictions for all available target variables.
- predict_metric(..., metric): Returns only one specific metric from the model's output.
"""

import joblib
import pandas as pd


def predict_all(
    Precio,
    Costo,
    Rotacion,
    Marketing,
    Ingresos_totales,
    Costos_operativos,
    Precio_competencia,
    Demanda_sectorial,
    Tasa_CUP_USD,  # 👈 New parameter
):
    # Load trained multi-output regression model
    model = joblib.load("modelo_regresion.pkl")

    # Input data with all expected features
    entrada = pd.DataFrame(
        [
            {
                "Precio_promedio": Precio,
                "Costos": Costo,
                "Rotacion": Rotacion,
                "Marketing": Marketing,
                "Ingresos_totales": Ingresos_totales,
                "Costos_operativos": Costos_operativos,
                "Precio_competencia": Precio_competencia,
                "Demanda_sectorial": Demanda_sectorial,
                "Tasa_CUP_USD": Tasa_CUP_USD,
            }
        ]
    )

    # Predict
    pred = model.predict(entrada)
    pred = pred[0]  # Extract from array

    return {
        "Ventas": pred[0],
        "Beneficio_neto": pred[1],
        "Ingresos_totales_estimado": pred[2],
    }


def predict_metric(*args, metric="Ventas", **kwargs):
    result = predict_all(*args, **kwargs)
    return result.get(metric, None)


if __name__ == "__main__":
    # Simulated example with current exchange rate
    tasa_actual = 360  # Example exchange rate, replace with actual value

    predicciones = predict_all(
        Precio=135,
        Costo=48,
        Rotacion=8,
        Marketing=17,
        Ingresos_totales=14500,
        Costos_operativos=4800,
        Precio_competencia=108,
        Demanda_sectorial=1.55,
        Tasa_CUP_USD=tasa_actual,
    )

    print("🔮 Predicción completa:")
    for key, value in predicciones.items():
        print(f" - {key}: {value:.2f}")
