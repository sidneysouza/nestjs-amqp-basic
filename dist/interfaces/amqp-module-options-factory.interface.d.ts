import { AmqpModuleOptions } from './amqp-module-options.interface';
export interface AmqpModuleOptionsFactory {
    createMailerOptions(): Promise<AmqpModuleOptions> | AmqpModuleOptions;
}
