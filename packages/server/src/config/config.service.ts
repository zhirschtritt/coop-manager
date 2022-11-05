import Joi from '@hapi/joi';
import { ConfigSchema } from './config';
import * as _ from 'lodash';

class ConfigMissingException extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class ConfigService {
  private config: unknown;
  constructor(rawConfig: unknown) {
    this.config = this.validate(rawConfig, ConfigSchema);
  }

  private validate(config: unknown, schema: Joi.Schema) {
    const { error, value: validatedConfig } = schema.validate(config);
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
}
