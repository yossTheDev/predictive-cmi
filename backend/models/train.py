import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.multioutput import MultiOutputRegressor
import joblib


def train_model():
    # Read data from CSV
    df = pd.read_csv("data.csv")

    print("📊 Data loaded from 'data.csv'")
    print("📊 Data shape:", df.shape)

    # 🧠 Preprocess 
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
            "Tasa_CUP_USD",
        ]
    ]

    y = df[["Ventas", "Beneficio_neto", "Ingresos_totales_final"]]

    # 🧠 Train model
    model = MultiOutputRegressor(LinearRegression())
    model.fit(X, y)

    # 💾 Save model
    joblib.dump(model, "modelo_regresion.pkl")
    print("✅ Modelo entrenado y guardado en 'modelo_regresion.pkl'")


if __name__ == "__main__":
    train_model()
