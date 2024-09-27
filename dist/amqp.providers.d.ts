import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';
export declare const createAmqpConnection: (options: AmqpModuleOptions) => Promise<import("amqplib").Connection>;
export declare const amqpProviders: {
    provide: string;
    useFactory: (options: AmqpModuleOptions) => Promise<import("amqplib").Connection>;
    inject: string[];
}[];
