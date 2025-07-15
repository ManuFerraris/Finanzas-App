import { MikroORM } from '@mikro-orm/core';

declare global {
    namespace Express {
        interface Application {
            locals: {
                orm: MikroORM;
            };
        }
    }
}

export default interface AppLocals {
    orm: MikroORM;
}

export default interface CustomRequest extends Request {
    app: Express.Application & { locals: AppLocals };
}