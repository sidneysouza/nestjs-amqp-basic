"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AmqpModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpModule = void 0;
const common_1 = require("@nestjs/common");
const amqp_service_1 = require("./amqp.service");
const amqp_constants_1 = require("./amqp.constants");
const amqp_providers_1 = require("./amqp.providers");
let AmqpModule = AmqpModule_1 = class AmqpModule {
    static forRoot(options) {
        return {
            module: AmqpModule_1,
            providers: [
                {
                    provide: amqp_constants_1.AMQP_MODULE_OPTIONS,
                    useValue: options,
                },
                ...amqp_providers_1.amqpProviders,
                amqp_service_1.AmqpService,
            ],
            exports: [amqp_service_1.AmqpService],
        };
    }
    static forRootAsync(asyncOptions) {
        return {
            module: AmqpModule_1,
            imports: asyncOptions.imports || [],
            providers: [
                {
                    provide: amqp_constants_1.AMQP_MODULE_OPTIONS,
                    useFactory: asyncOptions.useFactory,
                    inject: asyncOptions.inject || [],
                },
                ...amqp_providers_1.amqpProviders,
                amqp_service_1.AmqpService,
            ],
            exports: [amqp_service_1.AmqpService],
        };
    }
    static register(options) {
        return this.forRoot(options);
    }
    static registerAsync(asyncOptions) {
        return this.forRootAsync(asyncOptions);
    }
};
exports.AmqpModule = AmqpModule;
exports.AmqpModule = AmqpModule = AmqpModule_1 = __decorate([
    (0, common_1.Module)({})
], AmqpModule);
//# sourceMappingURL=amqp.module.js.map