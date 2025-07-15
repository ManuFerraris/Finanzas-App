import { Router } from "express";
import { 
    registrarMovimiento, 
    listarMovimientos, 
    editarMovimiento, 
    eliminarMovimiento,
    listarMovimientosFiltrados,
    listarMetricasPorCategoria } from "../controllers/movimiento.controller.ts";

const movimientoRouter = Router();

movimientoRouter.post('/', registrarMovimiento);
movimientoRouter.get('/', listarMovimientos);
movimientoRouter.put('/:id', editarMovimiento);
movimientoRouter.delete('/:id', eliminarMovimiento);
movimientoRouter.get('/filtrados', listarMovimientosFiltrados);
movimientoRouter.get('/metricas/categorias', listarMetricasPorCategoria);

export default movimientoRouter;