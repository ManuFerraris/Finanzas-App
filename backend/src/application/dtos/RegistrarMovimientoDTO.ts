import { TipoMovimiento } from "../../domain/enums/TipoMovimiento.ts";

export interface RegistrarMovimientoDTO {
    descripcion: string;
    monto: number;
    fecha: Date | string;
    tipo: TipoMovimiento;
    categoriaId: number;
};

export function validarMovimiento(dto: RegistrarMovimientoDTO): string[] {
    const errores: string[] = [];
    if (!dto.descripcion || dto.descripcion.trim().length === 0) {
        errores.push("La descripción es obligatoria.");
    }
    if (typeof dto.monto !== "number" || dto.monto <= 0) {
        errores.push("El monto debe ser un número positivo.");
    }
    if (!(dto.fecha instanceof Date) && isNaN(Date.parse(dto.fecha))) {
        errores.push("La fecha debe ser una fecha válida.");
    }
    if (!Object.values(TipoMovimiento).includes(dto.tipo)) {
        errores.push("El tipo de movimiento es inválido.");
    }

    return errores;
};