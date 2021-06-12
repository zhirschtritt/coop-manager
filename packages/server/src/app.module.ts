import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MembershipsModule} from './memberships/memberships.module';

import {ConfigModule, ConfigService} from './config';
import {
  MemberEntity,
  MembershipEntity,
  MembershipTypeEntity,
} from './memberships';
import {EventsModule} from './events/events.module';
import {MembersModule, MembersController} from './members';
import {
  ShiftEntity,
  ShiftAssignmentEntity,
  ShiftTermEntity,
  ShiftsModule,
} from './shifts';
import {CoopEventEntity} from './events/coop-event.entity';

@Module({
  imports: [
    ConfigModule,
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
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.databaseConfig(),
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
