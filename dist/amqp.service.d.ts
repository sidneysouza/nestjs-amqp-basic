import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';
import { Connection, Message } from 'amqplib';
export declare class AmqpService implements OnModuleInit, OnModuleDestroy {
    private readonly options;
    private readonly connection;
    private channel;
    constructor(options: AmqpModuleOptions, connection: Connection);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    publish(message: string): Promise<boolean>;
    consume(callback: (message: Message) => void): Promise<void>;
}
