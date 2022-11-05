import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

// see prisma bug: https://github.com/prisma/studio/issues/614
// might be fixed in later node version?
(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap() {
  let app: INestApplication;
  try {
    app = await NestFactory.create(AppModule);
  } catch (err) {
    console.error(err);
    throw err;
  }
  const logger = app.get(Logger);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5020);
}

bootstrap();
