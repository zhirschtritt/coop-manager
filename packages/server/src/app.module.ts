import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {LoggerModule} from 'nestjs-pino';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import {MembersController, MembersModule} from './members';
import {MembershipsModule} from './memberships/memberships.module';
import {PrismaModule} from './prisma/prisma.module';
import {ShiftsModule} from './shifts';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        autoLogging: false,
        level: 'trace',
      },
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    MembershipsModule,
    ShiftsModule,
    MembersModule,
    EventsModule,
    PrismaModule,
  ],
  controllers: [AppController, MembersController],
  providers: [AppService],
})
export class AppModule {}
