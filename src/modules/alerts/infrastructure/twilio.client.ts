import twilio from 'twilio';

export class TwilioClient {
  private client: ReturnType<typeof twilio> | null = null;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    if (accountSid && authToken && accountSid !== 'test_account_sid') {
      this.client = twilio(accountSid, authToken);
    }
  }

  async sendSMS(to: string, message: string): Promise<{ success: boolean; sid?: string }> {
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
    } catch (error) {
      console.error('[Twilio] Error sending SMS:', error);
      return { success: false };
    }
  }
}
