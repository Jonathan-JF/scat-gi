import { Alert, AlertChannel, AlertStatus } from '@prisma/client';
import { prisma } from '@/shared/database/prisma';

export class AlertRepository {
  private prisma = prisma;

  async create(data: {
    incidentId: string;
    message: string;
    channel?: AlertChannel;
    status: AlertStatus;
    sentAt?: Date;
  }): Promise<Alert> {
    return this.prisma.alert.create({
      data: {
        incidentId: data.incidentId,
        message: data.message,
        channel: data.channel ?? AlertChannel.SMS,
        status: data.status,
        sentAt: data.sentAt,
      },
    });
  }

  async findById(id: string): Promise<Alert | null> {
    return this.prisma.alert.findUnique({ where: { id } });
  }

  async findActive(): Promise<Alert[]> {
    return this.prisma.alert.findMany({
      where: { status: { in: [AlertStatus.SENT, AlertStatus.PENDING] } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: AlertStatus, sentAt?: Date): Promise<Alert> {
    return this.prisma.alert.update({
      where: { id },
      data: { status, sentAt },
    });
  }

  async findIncidentById(incidentId: string) {
    return this.prisma.incident.findUnique({ where: { id: incidentId } });
  }

  async createNotification(alertId: string, userId: string) {
    return this.prisma.notification.create({
      data: { alertId, userId, deliveredAt: new Date() },
    });
  }

  async findCitizens() {
    return this.prisma.user.findMany({ where: { role: 'CITIZEN' } });
  }
}
