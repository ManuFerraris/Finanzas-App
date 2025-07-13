import { Categoria } from "../../../domain/entities/Categoria.ts";
import { CategoriaRepository } from "../../../application/interfaces/CategoriaRepository.ts";

export class EliminarCategoria {
    constructor(private readonly repo: CategoriaRepository) {};

    async ejecutar(nro: number): Promise<string[]> {
        const errores: string[] = [];

        const categoria = await this.repo.buscarCategoriaPorId(nro);
        if (!categoria) {
            errores.push(`No se encontró la categoría con el número ${nro}`);
            return errores;
        };

        const movimientoAsociado = await this.repo.buscarMovimientosPorCategoria(nro);
        if (movimientoAsociado.length > 0) {
            errores.push(`La categoria con el número ${nro} posee movimientos asociados y no puede ser eliminada`);
            return errores;
        };
        
        try {
            await this.repo.eliminarCategoria(categoria);
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            errores.push('Error al eliminar la categoría');
        };

        return errores;
    };
}