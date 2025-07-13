import { Categoria } from "../../domain/entities/Categoria.ts";
import { Movimiento } from "../../domain/entities/Movimiento.ts";

export interface CategoriaRepository {

    guardar(categoria: Categoria): Promise<void>;
    verificarExistencia(nombre: string): Promise<boolean>;
    getAllCategorias(): Promise<Categoria[]>;
    buscarCategoriaPorId(nro: number): Promise<Categoria | null>;
    eliminarCategoria(categoria: Categoria): Promise<void>;
    buscarMovimientosPorCategoria(nro: number): Promise<Movimiento[]>;
}