import { Router } from "express";
import { registrarMovimiento, listarMovimientos, editarMovimiento, eliminarMovimiento } from "../controllers/movimiento.controller.ts";

const movimientoRouter = Router();

movimientoRouter.post('/', registrarMovimiento);
movimientoRouter.get('/', listarMovimientos);
movimientoRouter.put('/:id', editarMovimiento);
movimientoRouter.delete('/:id', eliminarMovimiento);

export default movimientoRouter;