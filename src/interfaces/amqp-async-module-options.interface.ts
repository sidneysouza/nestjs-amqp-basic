import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { AmqpModuleOptionsFactory } from './amqp-module-options-factory.interface';
import { AmqpModuleOptions } from './amqp-module-options.interface';

export interface AmqpAsyncModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<AmqpModuleOptionsFactory>;
  useExisting?: Type<AmqpModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AmqpModuleOptions> | AmqpModuleOptions;
  extraProviders?: Provider[];
}
