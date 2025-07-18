import { Request, Response } from "express";
import { CategoriaRepositoryORM } from "../../infrastructure/database/database/repositorio/CategoriaRepositoryORM.ts";
import { RegistrarCategoria } from "../../application/use-cases/categoriaUseCase/RegistrarCategoria.ts";
import { SqlEntityManager } from "@mikro-orm/mysql";
import { MikroORM } from "@mikro-orm/core";
import { ListarCategorias } from "../../application/use-cases/categoriaUseCase/ListarCategoria.ts";
import { ActualizarCategoria } from "../../application/use-cases/categoriaUseCase/ActualizarCategoria.ts";
import { EliminarCategoria } from "../../application/use-cases/categoriaUseCase/EliminarCategoria.ts";

export const registrarCategoria = async (req: Request, res: Response): Promise<void> => {
    try{
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new CategoriaRepositoryORM(em);
        const casouso = new RegistrarCategoria(repo);

        const dto = req.body;

        const resultado = await casouso.ejecutar(dto);

        if (Array.isArray(resultado)) {
            res.status(400).json({ message: resultado[0], categoria: null });
            return;
        }

        const categoriaCreada = {
        nro: resultado, // nro que devuelve el caso de uso.
        nombre: dto.nombre,
        color: dto.color
        };

        res.status(201).json({
        message: "Categoría registrada exitosamente",
        categoria: categoriaCreada
        });
        return;
    } catch (error) {
        console.error('Error al registrar categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const listarCategorias = async (req:Request, res:Response): Promise<void> => {
    try{
        const orm = (req.app.locals as { orm: MikroORM}).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new CategoriaRepositoryORM(em);
        const casouso = new ListarCategorias(repo);

        const categorias = await casouso.ejecutar();

        if (categorias.length === 0) {
            res.status(200).json({ categorias: [], message: 'No hay categorías registradas' });
            return;
        };

        res.status(200).json(categorias);
        return;

    }catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const editarCategoria = async (req:Request, res:Response): Promise<void> => {
    try{
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new CategoriaRepositoryORM(em);
        const casouso = new ActualizarCategoria(repo);

        const categoriaId = Number(req.params.nro);
        const dto = req.body;

        const errores = await casouso.ejecutar(categoriaId, dto);
        if (errores.length > 0) {
            res.status(400).json({ message: errores[0] });
            return;
        };

        res.status(200).json({ message: 'Categoría actualizada exitosamente',
            categoria: {
                nro: categoriaId,
                nombre: dto.nombre,
                color: dto.color
            } as { nro: number; nombre: string; color: string
                } 
            });
        return;
    } catch (error) {
        console.error('Error al editar categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const eliminarCategoria = async (req: Request, res: Response): Promise<void> => {
    try{
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new CategoriaRepositoryORM(em);
        const casouso = new EliminarCategoria(repo);

        const categoriaId = Number(req.params.nro);

        const errores = await casouso.ejecutar(categoriaId);
        if (errores.length > 0) {
            res.status(400).json({ message: errores[0] });
            return;
        };

        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
        return;

    }catch(error){
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};