import {Logger} from 'nestjs-pino';
import * as firebase from 'firebase-admin';
import * as fireorm from 'fireorm';
import {NestFactory} from '@nestjs/core';
import {ConfigService} from '@nestjs/config';

import {AppModule} from './app/app.module';

function initializeFirebase() {
  firebase.initializeApp();

  const firestore = firebase.firestore();
  firestore.settings({timestampsInSnapshots: true});

  fireorm.initialize(firestore);
}

async function bootstrap() {
  initializeFirebase();

  const app = await NestFactory.create(AppModule, {logger: false});

  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);
  const port = config.get<number>('port');

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
