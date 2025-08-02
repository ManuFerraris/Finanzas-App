import type { Movimiento } from "../types/Movimiento.ts";
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

export async function getMovimientos() {
    try {
        const res = await api.get("/movimientos");
        return { datos: res.data, error: null };
    }catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { datos: [], error: mensajeError };
    }
}

export async function crearMovimiento(data: {
    descripcion: string;
    monto: number;
    fecha: Date;
    tipo: string;
    categoriaId?: number; }) {
    try {
        const res = await api.post("/movimientos", data);
        return { datos: res.data.movimiento, error: null };
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { datos: null, error: mensajeError };
    }
};

export async function editarMovimiento(
    id: number, 
    datos: Omit<Movimiento, "id">
    ):Promise<{ datos?: Movimiento | null; error?: string | null }> {
    try {
        console.log("datos que se mandan a editar: ", datos )
        const res = await api.put(`/movimientos/${id}`, datos);
        return { datos: res.data.movimiento, error: null };
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { datos: null, error: mensajeError };
    }
};

export async function eliminarMovimiento(id: number) {
    try {
        await api.delete(`/movimientos/${id}`);
        return { ok: true, error: null };
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido al eliminar";
        return { ok: false, error: mensajeError };
    }
};