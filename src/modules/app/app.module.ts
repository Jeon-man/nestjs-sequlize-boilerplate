import { LoggerMiddleware } from '@module/logger';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from '..';

@Module({
  imports: [...Object.values(Modules).filter(m => m && m !== AppModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

export default AppModule;