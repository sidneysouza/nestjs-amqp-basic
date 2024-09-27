import { connect } from 'amqplib';
import { AMQP_CONNECTION, AMQP_MODULE_OPTIONS } from './amqp.constants';
import { AmqpModuleOptions } from './interfaces/amqp-module-options.interface';

export const createAmqpConnection = async (options: AmqpModuleOptions) => {
  const connection = await connect(options.uri);
  return connection;
};

export const amqpProviders = [
  {
    provide: AMQP_CONNECTION,
    useFactory: async (options: AmqpModuleOptions) => {
      return createAmqpConnection(options);
    },
    inject: [AMQP_MODULE_OPTIONS],
  },
];
