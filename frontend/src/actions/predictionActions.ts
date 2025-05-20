"use server";

import { revalidatePath } from "next/cache";

import { PredictionService } from "@/service/PredictionService";
import { PredictionData } from "@/types/predictionData";
import { PredictionDataRequest } from "@/types/predictionRequest";


export async function getDataFromBackend(): Promise<PredictionData[]> {
    return await PredictionService.getData();
}


export async function addDataToBackend(data: PredictionDataRequest) {
    try {
        const response = await PredictionService.addData(data);

        revalidatePath("/");
        return response;
    } catch (error) {
        console.error("Error adding new data:", error);
        throw error;
    }
}