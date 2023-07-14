import { AppModule } from '@module/app';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Case from 'case';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config: ConfigService = app.get(ConfigService);
  const NODE_ENV = config.get('NODE_ENV');

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
      enableDebugMessages: NODE_ENV !== 'production',
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(Case.title(config.get('APP_NAME')))
    .setDescription(`The ${config.get('APP_NAME')} API description`)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
      },
      'accessJWT',
    )
    .addBearerAuth(
      {
        description: `토큰을 refresh할 때 같이 갱신해주어야 함`,
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refreshJWT',
    )
    .addTag('user', 'user 관련 api')
    .addTag('auth', 'auth 관련 api')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      authAction: {
        accessJWT: {
          name: 'accessJWT',
          schema: {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: '213123',
        },
      },
      docExpansion: 'none', // "list", "full", "none"
      syntaxHighlight: {
        activate: true,
        theme: 'nord',
      },
    },
    customJs: 'https://cdn.flarelane.com/WebSDK.js',
    customJsStr: `FlareLane.initialize({ projectId: "c95fa7be-3d99-4d6f-8054-1cac6c3ed05a" });`,
  });

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
