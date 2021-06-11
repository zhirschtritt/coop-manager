import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MembershipsModule} from './memberships/memberships.module';
import {ShiftsModule} from './shifts/shifts.module';
import {MembersController} from './members/members.controller';
import {MembersModule} from './members/members.module';
import {ConfigModule, ConfigService} from './config';
import {
  MemberEntity,
  MembershipEntity,
  MembershipTypeEntity,
} from './memberships';
import {ShiftEntity} from './shifts/shift.entity';
import {ShiftAssignmentEntity} from './shifts/shift-assignment.entity';
import {ShiftTermEntity} from './shifts/shift-term.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      MemberEntity,
      MembershipTypeEntity,
      MembershipEntity,
      ShiftEntity,
      ShiftAssignmentEntity,
      ShiftTermEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.databaseConfig('../**/*.entity.js');
      },
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
