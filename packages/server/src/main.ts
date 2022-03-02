// eslint-disable-next-line @typescript-eslint/no-var-requires
const DBMigrate = require('db-migrate');

import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {Logger} from 'nestjs-pino';
import {AppModule} from './app.module';

async function bootstrap() {
  let app: INestApplication;
  try {
    app = await NestFactory.create(AppModule);
  } catch (err) {
    console.error(err);
    throw err;
  }
  const logger = app.get(Logger);

  // run db migrations
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DB_URL env required');
  }

  logger.debug(`Running migrations for database url: ${dbUrl}`);
  const dbmigrate = DBMigrate.getInstance(true, {
    cwd: '.',
    throwUncatched: true,
  });
  await dbmigrate.up(undefined);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5020);
}

bootstrap();
