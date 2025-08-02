import { api } from "../api/axios.ts";
import type { MovimientoSinId } from "../types/Movimiento.ts";

export async function buscarCategoriaPorId(nro: number): Promise<boolean> {
    const res = await api.get(`/categorias/${nro}`);
    if(!res.data.categoria) {
        return false;
    }
    return true;
};

export async function validarMovimiento(movimiento:MovimientoSinId): Promise<string | null> {
    if (!movimiento.descripcion.trim()) {
        return "La descripción es obligatoria";
    }
    if (movimiento.monto <= 0) {
        return "El monto debe ser mayor a cero";
    }
    if (!movimiento.fecha) {
        return "La fecha es obligatoria";
    }
    if (!movimiento.tipo) {
        return "El tipo de movimiento es obligatorio";
    }else if (!["INGRESO", "EGRESO", "AHORRO", "DESCUENTO"].includes(movimiento.tipo)) {
        return "Tipo de movimiento inválido";
    }
    if(!movimiento.categoriaId){
        return "La categoría es obligatoria";
    } else if (movimiento.categoriaId < 0) {
        console.log("Id de categoria recibido: ", movimiento.categoriaId )
        return "ID de categoría inválido";
    }

    return null;
};