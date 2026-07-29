import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajoute des en-têtes HTTP de sécurité.
  app.use(helmet());

  // Autorise uniquement le frontend local et le frontend déployé.
  const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('(RE)Sources Relationnelles API')
    .setDescription('Swagger (RE)Sources Relationnelles API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();

/**
 * Documentation du fichier
 *
 * - Rôle : point d’entrée du backend.
 * - Fonctionnement : démarre NestJS, active Helmet, configure CORS et Swagger.
 * - À retenir : le serveur écoute sur la variable PORT ou sur 3001 par défaut.
 */