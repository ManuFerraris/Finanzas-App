import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";
import { Movimiento } from "../../../domain/entities/Movimiento.ts";

export class ListarMovimientosFiltrados {
    constructor(private readonly repo:MovimientoRepository) {};

    async ejecutar(tipo:string, mes:string): Promise<Movimiento[]> {
        const [anio, mesNumero] = mes.split("-").map(Number);
        const desde = new Date(anio, mesNumero - 1, 1);
        const hasta = new Date(anio, mesNumero, 1); // Primer día del mes siguiente

        return await this.repo.buscarPorTipoYFecha(tipo, desde, hasta);
    };
};