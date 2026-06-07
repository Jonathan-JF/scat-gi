"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioClient = void 0;
const twilio_1 = __importDefault(require("twilio"));
class TwilioClient {
    constructor() {
        this.client = null;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';
        if (accountSid && authToken && accountSid !== 'test_account_sid') {
            this.client = (0, twilio_1.default)(accountSid, authToken);
        }
    }
    async sendSMS(to, message) {
        if (!this.client) {
            console.log(`[Twilio TEST] SMS to ${to}: ${message}`);
            return { success: true, sid: `test_${Date.now()}` };
        }
        try {
            const result = await this.client.messages.create({
                body: message,
                from: this.fromNumber,
                to,
            });
            return { success: true, sid: result.sid };
        }
        catch (error) {
            console.error('[Twilio] Error sending SMS:', error);
            return { success: false };
        }
    }
}
exports.TwilioClient = TwilioClient;
//# sourceMappingURL=twilio.client.js.map