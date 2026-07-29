import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app-config';

const server = express();
let isInitialized = false;

async function bootstrapServer() {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    configureApp(app);
    await app.init();
    isInitialized = true;
  }

  return server;
}

export default async function handler(req: Request, res: Response) {
  const appServer = await bootstrapServer();
  return appServer(req, res);
}
