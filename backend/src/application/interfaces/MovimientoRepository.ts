import { Movimiento } from "../../domain/entities/Movimiento.ts";
import { Categoria } from "../../domain/entities/Categoria.ts";

export interface MovimientoRepository {

    guardar(movimiento: Movimiento): Promise<void>;
    buscarCategoriaPorId(categoriaId: number): Promise<Categoria | null>
    getAllMovimientos(): Promise<Movimiento[]>;
    buscarMovimientoPorId(id: number): Promise<Movimiento | null>;
    eliminarMovimiento(movimiento:Movimiento): Promise<void>;
    buscarPorTipoYFecha(tipo: string, desde: Date, hasta: Date): Promise<Movimiento[]>;
};