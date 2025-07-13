import { RegistrarCategoriaDTO, validarCategoria } from "../../dtos/RegistrarCategoriaDTO.ts";
import { Categoria } from "../../../domain/entities/Categoria.ts";
import { CategoriaRepository } from "../../interfaces/CategoriaRepository.ts";

export class RegistrarCategoria {
    constructor(private readonly repo: CategoriaRepository) {}

    async ejecutar(dto: RegistrarCategoriaDTO): Promise<string[]> {
        const errores = validarCategoria(dto);
        if (errores.length > 0) return errores;

        // Verificar si la categoría ya existe
        const existe = await this.repo.verificarExistencia(dto.nombre);
        if (existe) {
            return ['La categoría ya existe.'];
        };

        // Crear la nueva categoría
        const categoria = new Categoria();
        categoria.nombre = dto.nombre;
        categoria.color = dto.color;
        // El numero de movimientos es autoincremental.

        await this.repo.guardar(categoria);
        return [];
    };
};