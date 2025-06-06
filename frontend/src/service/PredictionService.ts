import { PredictionData } from "@/types/predictionData";
import { PredictionDataRequest } from "@/types/predictionRequest";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000/";


export const PredictionService = {
    async getPrediction(data: PredictionDataRequest) {
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

    async addData(data: PredictionDataRequest) {
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