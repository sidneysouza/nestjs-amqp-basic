import { DynamicModule } from '@nestjs/common';
import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';
import { AmqpAsyncModuleOptions } from './interfaces/amqp-async-module-options.interface';
export declare class AmqpModule {
    static forRoot(options: AmqpModuleOptions): DynamicModule;
    static forRootAsync(asyncOptions: AmqpAsyncModuleOptions): DynamicModule;
    static register(options: AmqpModuleOptions): DynamicModule;
    static registerAsync(asyncOptions: AmqpAsyncModuleOptions): DynamicModule;
}
