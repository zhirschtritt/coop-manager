import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MembersController, MembersModule } from './members';
import { MembershipsModule } from './memberships/memberships.module';
import { MembershipsService } from './memberships/memberships.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShiftsModule } from './shifts';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: 'http://localhost:3567',
      // apiKey: <API_KEY(if configured)>,
      appInfo: {
        // https://supertokens.com/docs/thirdpartypasswordless/appinfo
        appName: 'bike-coop-manager',
        apiDomain: 'http://localhost:5020',
        websiteDomain: process.env.WEB_URL || 'http://localhost:3000',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        autoLogging: false,
        level: 'trace',
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      cors: {
        origin: process.env.WEB_URL || 'http://localhost:3000',
        credentials: true,
      },
    }),
    MembershipsModule,
    ShiftsModule,
    MembersModule,
    EventsModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController, MembersController],
  providers: [MembershipsService],
})
export class AppModule {}
