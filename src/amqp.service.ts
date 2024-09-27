import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { AMQP_CONNECTION, AMQP_MODULE_OPTIONS } from './amqp.constants';
import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';
import { Channel, Connection, Message } from 'amqplib';

@Injectable()
export class AmqpService implements OnModuleInit, OnModuleDestroy {
  private channel: Channel;

  constructor(
    @Inject(AMQP_MODULE_OPTIONS) private readonly options: AmqpModuleOptions,
    @Inject(AMQP_CONNECTION) private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.options.queue, { durable: true });
    }
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
    console.log('AMQP connection closed');
  }

  async publish(message: string): Promise<boolean> {
    try {
      const buffer = Buffer.from(message);
      return this.channel.sendToQueue(this.options.queue, buffer, {
        persistent: true,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  async consume(callback: (message: Message) => void): Promise<void> {
    this.channel.consume(
      this.options.queue,
      async (message) => {
        if (!message) return;

        if (callback) {
          try {
            if (message) {
              callback(message);
            }
            this.channel.ack(message);
          } catch (error) {
            console.error('Error processing message:', error);
            this.channel.nack(message);
          }
        }
      },
      {
        noAck: false,
      },
    );
  }
}
