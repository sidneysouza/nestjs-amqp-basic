"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpService = void 0;
const common_1 = require("@nestjs/common");
const amqp_constants_1 = require("./amqp.constants");
let AmqpService = class AmqpService {
    constructor(options, connection) {
        this.options = options;
        this.connection = connection;
    }
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
    async publish(message) {
        try {
            const buffer = Buffer.from(message);
            return this.channel.sendToQueue(this.options.queue, buffer, {
                persistent: true,
            });
        }
        catch (error) {
            console.error('Failed to send message:', error);
            return false;
        }
    }
    async consume(callback) {
        this.channel.consume(this.options.queue, async (message) => {
            if (!message)
                return;
            if (callback) {
                try {
                    if (message) {
                        callback(message);
                    }
                    this.channel.ack(message);
                }
                catch (error) {
                    console.error('Error processing message:', error);
                    this.channel.nack(message);
                }
            }
        }, {
            noAck: false,
        });
    }
};
exports.AmqpService = AmqpService;
exports.AmqpService = AmqpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(amqp_constants_1.AMQP_MODULE_OPTIONS)),
    __param(1, (0, common_1.Inject)(amqp_constants_1.AMQP_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object])
], AmqpService);
//# sourceMappingURL=amqp.service.js.map