import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";

export class EliminarMovimiento {
    constructor(private readonly repo:MovimientoRepository) {};

    async ejecutar(id: number): Promise<string[]> {
        const errores: string[] = [];

        const movimiento = await this.repo.buscarMovimientoPorId(id);

        if (!movimiento) {
            errores.push('Movimiento no encontrado');
            return errores;
        };
        
        await this.repo.eliminarMovimiento(movimiento);

        return errores; // Retorna un array vacío si no hay errores
        
    };
}