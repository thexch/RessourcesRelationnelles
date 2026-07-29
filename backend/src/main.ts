import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();

/**
 * Documentation du fichier
 *
 * - Role : point d'entree du backend en local.
 * - Fonctionnement : demarre NestJS puis applique la configuration commune.
 * - A retenir : Vercel utilise api/index.ts comme point d'entree serverless.
 */
