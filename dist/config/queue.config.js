"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
exports.alertQueue = new bull_1.default('process-alert', redisUrl, {
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
    },
});
//# sourceMappingURL=queue.config.js.map