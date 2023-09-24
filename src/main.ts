import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

const port = process.env.PORT || 3000;

async function bootstrap() {
  //Initializing all the environment variables from ENV
  dotenv.config();

  //Initializing the logger
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  //Enabling CORS
  app.enableCors();

  //Starting and Logging the server
  logger.log('Starting App on: ' + 'http://localhost:' + port);
  await app.listen(port);
}
bootstrap();
