import { TipoMovimiento } from "../../domain/enums/TipoMovimiento.ts";

export interface ActualizarMovimientoDTO {
    descripcion: string;
    monto: number;
    fecha: Date;
    tipo: TipoMovimiento;
    categoriaId?: number;
};

export function validarActualizacionMovimiento(dto: ActualizarMovimientoDTO): string[] {
    const errores: string[] = [];
    
    if (!dto.descripcion || dto.descripcion.trim().length === 0) {
        errores.push("La descripción es obligatoria.");
    };

    const monto = Number(dto.monto);
    if (isNaN(monto) || monto <= 0) {
        errores.push("El monto debe ser un número positivo.");
    };
    if (!(dto.fecha instanceof Date) && isNaN(Date.parse(dto.fecha))) {
        errores.push("La fecha debe ser una fecha válida.");
    };
    if (!["INGRESO", "EGRESO", "AHORRO", "DESCUENTO"].includes(dto.tipo)) {
        console.log("DTO de tipo recibido en el backend: ", dto.tipo)
        errores.push("El tipo de movimiento es inválido.");
    };
    if (dto.categoriaId !== undefined && typeof dto.categoriaId !== "number") {
        errores.push("El ID de categoría debe ser un número.");
    };
    return errores;
};