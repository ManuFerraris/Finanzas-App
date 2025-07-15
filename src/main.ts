import 'reflect-metadata'; // Necesario para usar decoradores de MikroORM
import app from './app.ts';
import { initORM } from './infrastructure/database/database/repositorio/orm.ts';

async function bootstrap() {
    try{
        const orm = await initORM();

        app.locals.orm = orm; // Hacemos disponible el ORM en toda la app

        app.listen(3000, () => {
        console.log('App corriendo en http://localhost:3000');
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        process.exit(1); // Salimos del proceso si hay un error
    };
};

bootstrap();