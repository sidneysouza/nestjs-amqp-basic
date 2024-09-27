import { DynamicModule, Module } from '@nestjs/common';
import { AmqpService } from './amqp.service';

import { AMQP_MODULE_OPTIONS } from './amqp.constants';
import { amqpProviders } from './amqp.providers';
import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';
import { AmqpAsyncModuleOptions } from './interfaces/amqp-async-module-options.interface';

@Module({})
export class AmqpModule {
  static forRoot(options: AmqpModuleOptions): DynamicModule {
    return {
      module: AmqpModule,
      providers: [
        {
          provide: AMQP_MODULE_OPTIONS,
          useValue: options,
        },
        ...amqpProviders,
        AmqpService,
      ],
      exports: [AmqpService],
    };
  }

  static forRootAsync(asyncOptions: AmqpAsyncModuleOptions): DynamicModule {
    return {
      module: AmqpModule,
      imports: asyncOptions.imports || [],
      providers: [
        {
          provide: AMQP_MODULE_OPTIONS,
          useFactory: asyncOptions.useFactory!,
          inject: asyncOptions.inject || [],
        },
        ...amqpProviders,
        AmqpService,
      ],
      exports: [AmqpService],
    };
  }

  static register(options: AmqpModuleOptions): DynamicModule {
    return this.forRoot(options);
  }

  static registerAsync(asyncOptions: AmqpAsyncModuleOptions): DynamicModule {
    return this.forRootAsync(asyncOptions);
  }
}
