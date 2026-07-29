import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export function configureApp(app: INestApplication): void {
  app.use(helmet());

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
}
