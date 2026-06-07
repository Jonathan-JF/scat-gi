import { alertQueue } from '@/config/queue.config';
import { AlertService } from '@/modules/alerts/application/alert.service.impl';
import { AlertRepository } from '@/modules/alerts/infrastructure/alert.repository';
import { TwilioClient } from '@/modules/alerts/infrastructure/twilio.client';

const alertRepository = new AlertRepository();
const twilioClient = new TwilioClient();
const alertService = new AlertService(alertRepository, twilioClient);

export const startAlertWorker = (): void => {
  alertQueue.process('process-alert', async (job) => {
    const { incidentId } = job.data;
    console.log(`[Alert Worker] Processing alert for incident: ${incidentId}`);
    await alertService.processIncident(incidentId);
    console.log(`[Alert Worker] Alert processed for incident: ${incidentId}`);
  });

  alertQueue.on('failed', (job, err) => {
    console.error(`[Alert Worker] Job ${job?.id} failed:`, err.message);
  });

  console.log('[Alert Worker] Started and listening for process-alert jobs');
};
