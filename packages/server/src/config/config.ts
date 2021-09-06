import Joi from '@hapi/joi';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export const rawConfig = {
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    pass: process.env.DATABASE_PASS || '6river',
    user: process.env.DATABASE_USER || '6river',
    db:
      process.env.DATABASE_NAME ||
      (['test', 'e2e'].includes(process.env.NODE_ENV || '')
        ? 'bike_coop_manager_test'
        : 'bike_coop_manager_development'),
    slowQueryLog: 300,
  },
  logging: {
    level: (process.env.LOG_LEVEL || 'debug').toLowerCase() as LogLevel,
  },
};

const databaseConfigSchema = Joi.object().keys({
  type: Joi.string().default('postgres'),
  host: Joi.string().required(),
  port: Joi.number().required(),
  pass: Joi.string().required(),
  user: Joi.string().required(),
  db: Joi.string().required(),
  url: Joi.string(),
  slowQueryLog: Joi.number().required(),
});

const loggingSchema = Joi.object().keys({
  level: Joi.string().default('debug'),
});

export const ConfigSchema = Joi.object({
  database: databaseConfigSchema,
  logging: loggingSchema,
});
