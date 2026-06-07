"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAlertWorker = void 0;
const queue_config_1 = require("../config/queue.config");
const alert_service_impl_1 = require("../modules/alerts/application/alert.service.impl");
const alert_repository_1 = require("../modules/alerts/infrastructure/alert.repository");
const twilio_client_1 = require("../modules/alerts/infrastructure/twilio.client");
const alertRepository = new alert_repository_1.AlertRepository();
const twilioClient = new twilio_client_1.TwilioClient();
const alertService = new alert_service_impl_1.AlertService(alertRepository, twilioClient);
const startAlertWorker = () => {
    queue_config_1.alertQueue.process('process-alert', async (job) => {
        const { incidentId } = job.data;
        console.log(`[Alert Worker] Processing alert for incident: ${incidentId}`);
        await alertService.processIncident(incidentId);
        console.log(`[Alert Worker] Alert processed for incident: ${incidentId}`);
    });
    queue_config_1.alertQueue.on('failed', (job, err) => {
        console.error(`[Alert Worker] Job ${job?.id} failed:`, err.message);
    });
    console.log('[Alert Worker] Started and listening for process-alert jobs');
};
exports.startAlertWorker = startAlertWorker;
//# sourceMappingURL=alert.job.js.map