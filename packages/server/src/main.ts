import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService, config} from './config';

new ConfigService(config());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
