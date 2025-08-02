import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";
import { ActualizarMovimientoDTO } from "../../dtos/ActualizarMovimientoDTO.ts";
import { validarActualizacionMovimiento } from "../../dtos/ActualizarMovimientoDTO.ts";
import { Categoria } from "../../../domain/entities/Categoria.ts";

export class ActualizarMovimiento {
    constructor(private readonly repo: MovimientoRepository) {};

    async ejecutar(id: number, dto: ActualizarMovimientoDTO): Promise<{ errores: string[], categoria?: Categoria }> {
        const errores = validarActualizacionMovimiento(dto);
        if (errores.length > 0) return { errores };

        const movimiento = await this.repo.buscarMovimientoPorId(id);
        if (!movimiento) return { errores : ['Movimiento no encontrado.'] };

        const categoriaId = Number(dto.categoriaId);
        if (isNaN(categoriaId) || categoriaId <= 0) {
            return { errores : ['ID de categoría inválido. Debe ser un número positivo.'] };
        };
        
        const categoria = await this.repo.buscarCategoriaPorId(categoriaId);
        if (!categoria) return { errores : ['Categoría no encontrada.']};

        movimiento.descripcion = dto.descripcion;
        movimiento.monto = (dto.monto);
        movimiento.fecha = new Date(dto.fecha);
        movimiento.tipo = dto.tipo;
        movimiento.categoria = categoria;

        await this.repo.guardar(movimiento);
        return { errores: [], categoria };
    };
};