export interface Movimiento {
    descripcion: string;
    monto: number;
    fecha: string; // ISO
    categoria: {
        nombre: string;
        color: string;
    };
};