import {ConfigService} from './config.service';
import {config} from './config';

export const configProviders = [
  {
    provide: 'ConfigService',
    useFactory: async () => {
      return new ConfigService(config());
    },
  },
];
