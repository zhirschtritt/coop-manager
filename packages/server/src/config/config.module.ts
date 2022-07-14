import {Module} from '@nestjs/common';
import {rawConfig} from './config';
import {ConfigService} from './config.service';

export const CONFIG_SERVICE = Symbol('ConfigService');

const configFactory = {
  provide: CONFIG_SERVICE,
  useFactory: () => new ConfigService(rawConfig),
};

@Module({
  providers: [configFactory],
  exports: [CONFIG_SERVICE],
})
export class ConfigModule {}
