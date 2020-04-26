import {LoggerModule} from 'nestjs-pino';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MembersModule} from '../members/members.module';
import {AuthController} from '../auth/auth.controller';
import {AuthModule} from '../auth/auth.module';
import {config} from '../config/configuration';

@Module({
  imports: [
    MembersModule,
    AuthModule,
    ConfigModule.forRoot({load: [config]}),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV !== 'production' ? {translateTime: true} : false,
      },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
