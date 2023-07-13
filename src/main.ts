import { AppModule } from '@module/app';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config: ConfigService = app.get(ConfigService);
  const NODE_ENV = config.get('NODE_ENV');

  app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  //   prefix: 'v',
  // });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
      enableDebugMessages: NODE_ENV !== 'production',
      whitelist: true,
    }),
  );

  await app.listen(config.get('PORT') as string);

  // pm2 wait_ready
  if (process.send) {
    Logger.log('pm2 wait_ready');
    process.send('ready');
  }

  // pm2 reload
  process.on('SIGINT', async () => {
    // exit gracefully
    try {
      Logger.log('pm2 reload');
      await app.close();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  });
}
bootstrap();
