import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LoggerModule} from 'nestjs-pino';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CONFIG_SERVICE, ConfigModule, ConfigService} from './config';
import {CoopEventEntity} from './events/coop-event.entity';
import {EventsModule} from './events/events.module';
import {MembersController, MembersModule} from './members';
import {MemberEntity, MembershipEntity, MembershipTypeEntity} from './memberships';
import {MembershipsModule} from './memberships/memberships.module';
import {ShiftAssignmentEntity, ShiftEntity, ShiftsModule, ShiftTermEntity} from './shifts';

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
    TypeOrmModule.forFeature([
      MemberEntity,
      MembershipTypeEntity,
      MembershipEntity,
      ShiftEntity,
      ShiftAssignmentEntity,
      ShiftTermEntity,
      CoopEventEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.databaseConfig(),
      inject: [CONFIG_SERVICE],
    }),
    MembershipsModule,
    ShiftsModule,
    MembersModule,
    EventsModule,
  ],
  controllers: [AppController, MembersController],
  providers: [AppService],
})
export class AppModule {}
