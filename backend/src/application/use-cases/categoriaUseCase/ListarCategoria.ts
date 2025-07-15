import { CategoriaRepository } from "../../interfaces/CategoriaRepository.ts";
import { Categoria } from "../../../domain/entities/Categoria.ts";

export class ListarCategorias {
    constructor(private readonly repo: CategoriaRepository) {}

    async ejecutar(): Promise<Categoria[]>{
        return await this.repo.getAllCategorias();
    };
};