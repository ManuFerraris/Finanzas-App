import { Movimiento } from "../../../domain/entities/Movimiento.ts";
import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";

export class ListarMovimiento {
    constructor(private readonly repo: MovimientoRepository) {};

    async ejecutar(): Promise<Movimiento[]> {
        return await this.repo.getAllMovimientos();
    };
}