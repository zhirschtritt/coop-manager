import {Injectable, OnModuleInit} from '@nestjs/common';
import * as firebase from 'firebase-admin';

// FIXME: encode cert and import in env var via config module
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('~/Downloads/sbk-app-214521-firebase-adminsdk-c9w4q-5c7931883f.json');

@Injectable()
export class Firebase implements OnModuleInit {
  onModuleInit() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: "https://sbk-app-214521.firebaseio.com",
    });
  }
}
