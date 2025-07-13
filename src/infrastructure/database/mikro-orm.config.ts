import { Categoria } from "../../domain/entities/Categoria.ts";
import { Movimiento } from "../../domain/entities/Movimiento.ts";
import { MySqlDriver } from "@mikro-orm/mysql";
import dotenv from 'dotenv';

dotenv.config();
const NumDB_PORT = Number(process.env.DB_PORT)

const config = {
    entities: [Movimiento, Categoria],
    dbName: process.env.DB_NAME,
    driver: MySqlDriver,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: NumDB_PORT,
    debug: true,
}

export default config;