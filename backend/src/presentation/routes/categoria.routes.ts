import { Router } from "express";
import { registrarCategoria, listarCategorias, editarCategoria, eliminarCategoria } from "../controllers/categoria.controller.ts";
const categoriaRouter = Router();

categoriaRouter.post('/', registrarCategoria);
categoriaRouter.get('/', listarCategorias);
categoriaRouter.put('/:nro', editarCategoria);
categoriaRouter.delete('/:nro', eliminarCategoria);

export default categoriaRouter;