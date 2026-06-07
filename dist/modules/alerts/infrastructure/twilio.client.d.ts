export declare class TwilioClient {
    private client;
    private fromNumber;
    constructor();
    sendSMS(to: string, message: string): Promise<{
        success: boolean;
        sid?: string;
    }>;
}
//# sourceMappingURL=twilio.client.d.ts.map