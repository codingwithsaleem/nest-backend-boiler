import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json } from 'express';
import { AppModule } from './app.module';
import { EnvironmentService } from '@api/environment/src/environment.service';
import { SocketIoService } from '@app/socket-io';
import { LoggerService } from '@app/logger';
import session from 'express-session';
import RedisStore from 'connect-redis';
import passport from 'passport';
import { RedisService } from '@app/redis';
import { ConfigService } from '@nestjs/config';
import { AuthenticationEnvironmentValidator } from '@app/authentication';

declare const module: any;

/**
 * Boostrap API
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // SESSION
  app.use(
    session({
      store: new RedisStore({ client: app.get(RedisService).cache }),
      secret: app
        .get(ConfigService<AuthenticationEnvironmentValidator, true>)
        .get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors(app.get(EnvironmentService).getCorsConfig());
  app.use(json({ limit: '40mb' }));
  app.useLogger(app.get(LoggerService));

  // SWAGGER
  const config = new DocumentBuilder().setTitle('API').build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  });
  SwaggerModule.setup('API', app, document);

  // Class-Validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // SocketIO
  app.useWebSocketAdapter(app.get(SocketIoService).createRedisAdapter(app));
  await app.listen(app.get(EnvironmentService).port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
