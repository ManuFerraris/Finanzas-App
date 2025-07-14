import { Request, Response } from 'express';
import { RegistrarMovimiento } from '../../application/use-cases/movimientoUseCase/RegistrarMovimiento.ts';
import { MovimientoRepositoryORM } from '../../infrastructure/database/database/repositorio/MovimientoRepositoryORM.ts';
import { SqlEntityManager } from '@mikro-orm/mysql';
import { MikroORM } from '@mikro-orm/core';
import { ListarMovimiento } from '../../application/use-cases/movimientoUseCase/ListarMovimientos.ts';
import { ActualizarMovimiento } from '../../application/use-cases/movimientoUseCase/ActualizarMovimiento.ts';
import { EliminarMovimiento } from '../../application/use-cases/movimientoUseCase/EliminarMovimiento.ts';
import { ListarMovimientosFiltrados } from '../../application/use-cases/movimientoUseCase/ListarMovimientosFiltrados.ts';
import { validarParametrosFiltrado } from './funcionesParaControladores/validarParametrosFiltrado.ts';

export const registrarMovimiento = async (req: Request, res: Response): Promise<void> => {
    try {
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new MovimientoRepositoryORM(em);
        const casouso = new RegistrarMovimiento(repo);

        const dto = req.body;

        const errores = await casouso.ejecutar(dto);
        if (errores.length > 0) {
        res.status(400).json({ errores });
        return;
        };

        res.status(201).json({ message: 'Movimiento registrado correctamente.' });
        return;
    } catch (error) {
        console.error('Error al registrar movimiento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const listarMovimientos = async (req: Request, res: Response): Promise<void> => {
    try {
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new MovimientoRepositoryORM(em);
        const casouso = new ListarMovimiento(repo);

        const movimientos = await casouso.ejecutar();

        if (movimientos.length === 0) {
            res.status(404).json({ message: 'No se encontraron movimientos' });
            return;
        };

        res.status(200).json(movimientos);
        return;
    } catch (error) {
        console.error('Error al listar movimientos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const editarMovimiento = async (req: Request, res: Response): Promise<void> => {
    try{
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new MovimientoRepositoryORM(em);
        const casouso = new ActualizarMovimiento(repo);

        const id = Number(req.params.id);
        const dto = req.body;

        const errores = await casouso.ejecutar(id, dto);
        if (errores.length > 0) {
            res.status(400).json({ errores });
            return;
        };

        res.status(200).json({ message: 'Movimiento editado correctamente.' });
        return;

    }catch(errores){
        console.error('Error al editar movimiento:', errores);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const eliminarMovimiento = async (req: Request, res: Response): Promise<void> => {
    try {
        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new MovimientoRepositoryORM(em);
        const casouso = new EliminarMovimiento(repo);
        
        const movimientoId = Number(req.params.id);
        if (!movimientoId) {
            res.status(400).json({ error: 'ID de movimiento no proporcionado' });
            return;
        };

        const errores = await casouso.ejecutar(movimientoId);

        if (errores.length > 0) {
            res.status(400).json({ errores });
            return;
        };

        res.status(200).json({ message: 'Movimiento eliminado correctamente.' });
        return;

    } catch (error) {
        console.error('Error al eliminar movimiento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    };
};

export const listarMovimientosFiltrados = async (req:Request, res:Response): Promise<void> =>{
    try{
        const {tipo, mes} = req.query;

        if(!tipo || !mes){
            res.status(400).json({ error: 'Fltan parametros \'tipo\' y/o \'mes\'' });
            return;
        };

        const tipoStr = req.query.tipo?.toString() ?? "";
        const mesStr = req.query.mes?.toString() ?? "";

        const errores = validarParametrosFiltrado(tipoStr, mesStr);
        if (errores.length > 0) {
            res.status(400).json({ errores });
            return;
        };

        const orm = (req.app.locals as { orm: MikroORM }).orm;
        const em = orm.em.fork() as SqlEntityManager;
        const repo = new MovimientoRepositoryORM(em);
        const casouso = new ListarMovimientosFiltrados(repo);

        const movimientos = await casouso.ejecutar(tipo.toString(), mes.toString());
        if (movimientos.length === 0) {
            res.status(404).json({ message: 'No se encontraron movimientos filtrados' });
            return;
        };

        res.status(200).json(movimientos);
        return;

    } catch(error){
        console.error('Error al listar movimientos filtrados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
    }
}