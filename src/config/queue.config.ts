import Bull from 'bull';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const alertQueue = new Bull<{ incidentId: string }>('process-alert', redisUrl, {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
  },
});
