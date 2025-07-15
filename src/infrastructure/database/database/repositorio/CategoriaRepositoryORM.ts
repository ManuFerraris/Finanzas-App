import { Categoria } from "../../../../domain/entities/Categoria.ts";
import { CategoriaRepository } from "../../../../application/interfaces/CategoriaRepository.ts";
import { EntityManager } from "@mikro-orm/mysql";

export class CategoriaRepositoryORM implements CategoriaRepository {

    constructor(private readonly em:EntityManager) {};

    async guardar(categoria: Categoria): Promise<void> {
        await this.em.persistAndFlush(categoria);
    };

    async verificarExistencia(nombre: string): Promise<boolean> {
        const categoria = await this.em.findOne(Categoria, { nombre });
        if(categoria) return true;
        return false;
    };

    async getAllCategorias(): Promise<Categoria[]> {
        return await this.em.find(Categoria, {});
    };

    async buscarCategoriaPorId(nro: number): Promise<Categoria | null> {
        const categoriaToUpdate = await this.em.findOne(Categoria, { nro });
        if (categoriaToUpdate) return categoriaToUpdate;
        else return null;
    };

    async eliminarCategoria(categoria: Categoria): Promise<void> {
        await this.em.removeAndFlush(categoria);
    };

    async buscarMovimientosPorCategoria(nro: number): Promise<any[]> {
        const categoria = await this.em.findOne(Categoria, { nro });
        if (!categoria) return [];
        
        return await this.em.find('Movimiento', { categoria: categoria });
    };
};