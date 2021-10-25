import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppMiddleware } from './app.middleware';

import { RecipesModule } from './recipes/recipes.module';
import { AppController } from './app.controller';
import { EnvController } from './env/env.controller';

@Module({
    imports: [RecipesModule],
    controllers: [AppController, EnvController]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        });
    }
}

