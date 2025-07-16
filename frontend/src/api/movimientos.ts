import { api } from "./axios.ts";
import { AxiosError } from "axios";
export async function getMovimientosFiltrados(tipo: string, mes:string) {
    try{
        const res = await api.get(`/movimientos/filtrados`, {
        params: { tipo, mes }
    });
    return { datos: res.data, error:null};
    }catch (error:unknown) {
    // Capturamos el mensaje de error si es 404
    const err = error as AxiosError<{ message: string }>;
    const mensajeError = err?.response?.data?.message ?? "Error desconocido";
    return { datos: [], error: mensajeError };
    }
};