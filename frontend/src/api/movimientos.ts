import { api } from "./axios.ts";

export async function getMovimientosFiltrados(tipo: string, mes:string) {
    const res =await api.get(`/movimientos/filtrados`, {
        params: { tipo, mes }
    });
    return res.data;
};