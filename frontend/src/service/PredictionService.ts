/* eslint-disable @typescript-eslint/no-explicit-any */
import { PredictionData } from "@/types/predictionData";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000/";

export const PredictionService = {
    async getPrediction(data: any) {
        try {
            const response = await axios.post(`${BACKEND_URL}predict`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener la predicción:", error);
            throw error;
        }
    },

    async addData(data: any) {
        try {
            const response = await axios.post(`${BACKEND_URL}add-data`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al agregar los datos:", error);
            throw error;
        }
    },

    async getData(): Promise<PredictionData[]> {
        try {
            const response = await axios.get(`${BACKEND_URL}data`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            throw error;
        }
    },
};