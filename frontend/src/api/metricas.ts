import { api } from "./axios.ts";
import { AxiosError } from "axios";

export async function getMetricasPorCategoria(tipo:string, mes:string) {
    try{
        const res = await api.get(`/movimientos/metricas/categorias`, {
            params: { tipo, mes },
        });
        return { datos: res.data, error: null };
    }catch(error:unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { datos: [], error: mensajeError };
    };
};