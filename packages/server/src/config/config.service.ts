import Joi from '@hapi/joi';
import {ConfigSchema} from './config';
import * as _ from 'lodash';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

class ConfigMissingException extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class ConfigService {
  private config: unknown;
  constructor(config: unknown) {
    this.config = this.validate(config, ConfigSchema);
  }

  private validate(config: unknown, schema: Joi.Schema) {
    const {error, value: validatedConfig} = schema.validate(config);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedConfig;
  }

  get<T>(path: string, defaultValue?: T): T {
    const val: T = _.get(this.config, path);
    if (val === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new ConfigMissingException(`Required config: ${path} not found!`);
    }
    return val;
  }

  tryGet<T>(path: string): T | undefined {
    return _.get(this.config, path);
  }

  databaseConfig(): TypeOrmModuleOptions {
    const baseOpts: TypeOrmModuleOptions = {
      type: 'postgres',
      synchronize: false,
      autoLoadEntities: true,
      maxQueryExecutionTime: this.get<number>('database.slowQueryLog'),
      entities: ['../**/*.entity.js'],
      subscribers: ['../**/*.subscriber.js'],
    };
    const url = this.tryGet<string>('database.url');
    if (url) {
      return Object.assign(baseOpts, {
        url,
      });
    }
    return Object.assign(baseOpts, {
      host: this.get<string>('database.host'),
      username: this.get<string>('database.user'),
      password: this.get<string>('database.pass'),
      database: this.get<string>('database.db'),
    });
  }
}
