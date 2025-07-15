import { RegistrarMovimientoDTO, validarMovimiento } from "../../dtos/RegistrarMovimientoDTO.ts";
import { Movimiento } from "../../../domain/entities/Movimiento.ts";
import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";

export class RegistrarMovimiento {

    constructor(private readonly repo: MovimientoRepository) {}

    async ejecutar(dto: RegistrarMovimientoDTO): Promise<string[]> {
        const errores = validarMovimiento(dto);
        if (errores.length > 0) return errores;
        
        //Busco categoria
        const categoriaId = Number(dto.categoriaId);
        if (isNaN(categoriaId) || categoriaId <= 0) return ['ID de categoría inválido.'];

        const categoria = await this.repo.buscarCategoriaPorId(categoriaId);
        if (!categoria) return ['Categoría no encontrada.'];

        // Crear el movimiento
        const movimiento = new Movimiento();
        movimiento.descripcion = dto.descripcion;
        movimiento.tipo = dto.tipo;
        movimiento.fecha = new Date(dto.fecha);
        movimiento.monto = dto.monto;
        movimiento.categoria = categoria;
        
        await this.repo.guardar(movimiento);
        return [];
    };
};