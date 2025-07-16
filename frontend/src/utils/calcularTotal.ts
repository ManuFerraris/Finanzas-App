import type { Movimiento } from "../types/Movimiento.ts";

export function calcularTotal(movimientos: Movimiento[]): number {
    return movimientos.reduce((acc, mov) => acc + Number(mov.monto), 0);
};