import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.multioutput import MultiOutputRegressor
import joblib


def train_model():
    # Full dataset with internal, market and financial variables
    data = {
        "Precio_promedio": [100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
        "Costos": [40, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        "Rotacion": [5, 5.5, 6, 6.2, 6.5, 6.8, 7, 7.2, 7.5, 7.8],
        "Marketing": [10, 11, 12, 13, 14, 15, 16, 16, 17, 18],
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
        # Market behavior
        "Precio_competencia": [95, 97, 98, 100, 102, 104, 105, 106, 108, 110],
        "Demanda_sectorial": [1.2, 1.3, 1.25, 1.35, 1.4, 1.45, 1.5, 1.52, 1.55, 1.6],
        # Nueva columna de tasa de cambio (simulando diferentes épocas)
        "Tasa_CUP_USD": [300, 310, 305, 320, 330, 335, 340, 345, 350, 360],
        # Targets
        "Ventas": [500, 520, 540, 560, 580, 600, 620, 630, 650, 670],
        "Beneficio_neto": [2000, 2100, 2050, 2200, 2300, 2400, 2500, 2600, 2700, 2800],
        "Ingresos_totales_final": [
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
    }

    df = pd.DataFrame(data)

    # Features (input)
    X = df[
        [
            "Precio_promedio",
            "Costos",
            "Rotacion",
            "Marketing",
            "Ingresos_totales",
            "Costos_operativos",
            "Precio_competencia",
            "Demanda_sectorial",
            "Tasa_CUP_USD",  # 👈 nueva feature
        ]
    ]

    y = df[["Ventas", "Beneficio_neto", "Ingresos_totales_final"]]

    model = MultiOutputRegressor(LinearRegression())
    model.fit(X, y)

    joblib.dump(model, "modelo_regresion.pkl")
    print("✅ Modelo entrenado y guardado en 'modelo_regresion.pkl'")


if __name__ == "__main__":
    train_model()
