import Joi from '@hapi/joi';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export const rawConfig = {
  logging: {
    level: (process.env.LOG_LEVEL || 'debug').toLowerCase() as LogLevel,
  },
};

const loggingSchema = Joi.object().keys({
  level: Joi.string().default('debug'),
});

export const ConfigSchema = Joi.object({
  logging: loggingSchema,
});
