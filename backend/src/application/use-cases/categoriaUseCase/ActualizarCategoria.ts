import { CategoriaRepository } from "../../interfaces/CategoriaRepository.ts";
import { ActualizarCategoriaDTO } from "../../dtos/ActualizarCategoriaDTO.ts";
import { validarActualizacionCategoria } from "../../dtos/ActualizarCategoriaDTO.ts";

export class ActualizarCategoria {
    constructor(private readonly repo: CategoriaRepository) {};

    async ejecutar(nro: number, dto: ActualizarCategoriaDTO): Promise<string[]> {
        const errores = validarActualizacionCategoria(nro, dto);
        if (errores.length > 0) return errores;

        const categoria = await this.repo.buscarCategoriaPorId(nro);
        if (!categoria) return ['Categoría no encontrada.'];

        categoria.nombre = dto.nombre;
        categoria.color = dto.color;

        await this.repo.guardar(categoria);
        return [];
    }
}