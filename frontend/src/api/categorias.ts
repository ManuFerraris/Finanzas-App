import { api } from './axios.ts';
import { AxiosError } from 'axios';
import type { Categoria } from '../types/Categoria.ts';

export async function getCategorias() {
    try{
        const res = await api.get("/categorias");
        return { datos: res.data, error: null};
    }catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { datos: [], error: mensajeError };
    };
};

export async function crearCategoria( data: { nombre:string, color:string }) {
    try{
        const res = await api.post("/categorias", data);
        return { datos: res.data.categoria, error:null};
    }catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensajeError = err?.response?.data?.message ?? "Error desconocido";
        return { error: mensajeError };
    };
};

export async function eliminarCategoria(nro: number) {
    try{
        await api.delete(`/categorias/${nro}`);
        return { ok:true, error: null };
    }catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensaje = err?.response?.data?.message;
        console.log("Mensaje desde backend:", mensaje);
        return { ok: false, error: mensaje ?? "Error desconocido al eliminar" };
    };
};

export async function editarCategoria(nro:number, 
    datos: { nombre:string, color:string}
): Promise<{ datos: Categoria | null; error: string | null }> {
    try {
        const res = await api.put(`/categorias/${nro}`, datos);
        return { datos: res.data.categoria, error: null };
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const mensaje = err?.response?.data?.message ?? "Error al editar la categoría";
        return { datos: null, error: mensaje };
    };
};