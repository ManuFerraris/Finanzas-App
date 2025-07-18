import express from 'express';
import movimientoRouter from './presentation/routes/movimiento.routes.ts';
import categoriaRouter from './presentation/routes/categoria.routes.ts';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//app.options('*', cors());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use('/api/movimientos', movimientoRouter);
app.use('/api/categorias', categoriaRouter);

export default app;