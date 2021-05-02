import {getConnectionOptions} from 'typeorm';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    MembershipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

