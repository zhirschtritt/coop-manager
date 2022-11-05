import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { MembersController, MembersModule } from './members';
import { MembershipsModule } from './memberships/memberships.module';
import { PrismaModule } from './prisma/prisma.module';
import { ShiftsModule } from './shifts';
import { MembershipsService } from './memberships/memberships.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        autoLogging: false,
        level: 'trace',
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MembershipsModule,
    ShiftsModule,
    MembersModule,
    EventsModule,
    PrismaModule,
  ],
  controllers: [AppController, MembersController],
  providers: [AppService, MembershipsService],
})
export class AppModule {}
