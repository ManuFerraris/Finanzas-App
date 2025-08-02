export type TipoMovimiento = "INGRESO" | "EGRESO" | "AHORRO" | "DESCUENTO";

/*export const TipoMovimiento = {
    INGRESO: "INGRESO",
    EGRESO: "EGRESO",
    AHORRO: "AHORRO",
    DESCUENTO: "DESCUENTO"
} as const;

export type TipoMovimiento = typeof TipoMovimiento[keyof typeof TipoMovimiento];*/

export interface Movimiento {
    id: number;
    descripcion: string;
    monto: number;
    fecha: Date | string;
    tipo: "INGRESO" | "EGRESO" | "AHORRO" | "DESCUENTO";
    categoriaId?: number; //Util para hacer POST/PUT
    categoria?: {
        nro:number;
        nombre:string;
        color:string;
    };
};

export type MovimientoSinId = Omit<Movimiento, "id">;