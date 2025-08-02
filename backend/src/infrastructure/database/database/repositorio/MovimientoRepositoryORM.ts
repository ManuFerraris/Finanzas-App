import { Movimiento } from "../../../../domain/entities/Movimiento.ts";
import { MovimientoRepository } from "../../../../application/interfaces/MovimientoRepository.ts";
import { EntityManager } from "@mikro-orm/mysql";
import { Categoria } from "../../../../domain/entities/Categoria.ts";
import { TipoMovimiento } from "../../../../domain/enums/TipoMovimiento.ts";

export class MovimientoRepositoryORM implements MovimientoRepository {

    constructor(private readonly em: EntityManager) {}

    async guardar(movimiento: Movimiento): Promise<void> {
        await this.em.persistAndFlush(movimiento);
        await this.em.populate(movimiento, ["categoria"]);
    };

    async buscarCategoriaPorId(categoriaId: number): Promise<Categoria | null> {
        const categoia = await this.em.findOne(Categoria, {nro: categoriaId});
        if(categoia) return categoia;
        return null;
    };

    async getAllMovimientos(): Promise<Movimiento[]> {
        return await this.em.find(Movimiento, {}, { populate: ['categoria'] });
    };

    async buscarMovimientoPorId(id: number): Promise<Movimiento | null> {
        const movimiento = await this.em.findOne(Movimiento, { id });
        if (movimiento) return movimiento;
        return null;
    };

    async eliminarMovimiento(movimiento: Movimiento): Promise<void> {
        await this.em.removeAndFlush(movimiento);
    };

    async buscarPorTipoYFecha(tipo: string, desde: Date, hasta: Date): Promise<Movimiento[]> {
        return await this.em.find(
            Movimiento,
            {
                tipo: tipo as TipoMovimiento,
                fecha: { $gte: desde, $lt: hasta }
            },
            { populate: ['categoria'] });
    };
};
