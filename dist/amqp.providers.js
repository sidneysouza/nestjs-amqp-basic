"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amqpProviders = exports.createAmqpConnection = void 0;
const amqplib_1 = require("amqplib");
const amqp_constants_1 = require("./amqp.constants");
const createAmqpConnection = async (options) => {
    const connection = await (0, amqplib_1.connect)(options.uri);
    return connection;
};
exports.createAmqpConnection = createAmqpConnection;
exports.amqpProviders = [
    {
        provide: amqp_constants_1.AMQP_CONNECTION,
        useFactory: async (options) => {
            return (0, exports.createAmqpConnection)(options);
        },
        inject: [amqp_constants_1.AMQP_MODULE_OPTIONS],
    },
];
//# sourceMappingURL=amqp.providers.js.map