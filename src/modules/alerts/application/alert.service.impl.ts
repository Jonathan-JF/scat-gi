import { Alert, AlertStatus } from '@prisma/client';
import { emitToOperators } from '@/config/socket.config';
import { AlertRepository } from '../infrastructure/alert.repository';
import { TwilioClient } from '../infrastructure/twilio.client';
import { AlertError } from '../domain/alert.errors';
import {
  AlertDetailResponseDto,
  AlertListResponseDto,
  AlertResponseDto,
} from '../presentation/dto/alert-response.dto';
import { IAlertService } from './alert.service';

export class AlertServiceImpl implements IAlertService {
  constructor(
    private alertRepository: AlertRepository,
    private twilioClient: TwilioClient
  ) {}

  async processIncident(incidentId: string): Promise<void> {
    const incident = await this.alertRepository.findIncidentById(incidentId);
    if (!incident) {
      throw new AlertError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
    }

    const message = `[SCAT-GI ALERTA] ${incident.name} | Severidad: ${incident.severity} | Coordenadas: ${incident.latitude}, ${incident.longitude} | Hora: ${new Date().toISOString()}`;

    const citizens = await this.alertRepository.findCitizens();
    let smsSuccess = true;

    for (const citizen of citizens) {
      if (citizen.phone) {
        const result = await this.twilioClient.sendSMS(citizen.phone, message);
        if (!result.success) smsSuccess = false;
      }
    }

    const alert = await this.alertRepository.create({
      incidentId,
      message,
      status: smsSuccess ? AlertStatus.SENT : AlertStatus.FAILED,
      sentAt: smsSuccess ? new Date() : undefined,
    });

    for (const citizen of citizens) {
      await this.alertRepository.createNotification(alert.id, citizen.id);
    }

    emitToOperators('alert:issued', this.mapToDto(alert));
  }

  async findActive(): Promise<AlertListResponseDto> {
    const alerts = await this.alertRepository.findActive();
    return { success: true, data: alerts.map((a) => this.mapToDto(a)) };
  }

  async findById(id: string): Promise<AlertDetailResponseDto> {
    const alert = await this.alertRepository.findById(id);
    if (!alert) {
      throw new AlertError('ALERT_NOT_FOUND', 404, 'Alerta no encontrada');
    }
    return { success: true, data: this.mapToDto(alert) };
  }

  async retry(id: string): Promise<AlertDetailResponseDto> {
    const alert = await this.alertRepository.findById(id);
    if (!alert) {
      throw new AlertError('ALERT_NOT_FOUND', 404, 'Alerta no encontrada');
    }

    const citizens = await this.alertRepository.findCitizens();
    let smsSuccess = true;

    for (const citizen of citizens) {
      if (citizen.phone) {
        const result = await this.twilioClient.sendSMS(citizen.phone, alert.message);
        if (!result.success) smsSuccess = false;
      }
    }

    const updated = await this.alertRepository.updateStatus(
      id,
      smsSuccess ? AlertStatus.SENT : AlertStatus.FAILED,
      smsSuccess ? new Date() : undefined
    );

    if (smsSuccess) {
      emitToOperators('alert:issued', this.mapToDto(updated));
    }

    return { success: true, data: this.mapToDto(updated) };
  }

  private mapToDto(alert: Alert): AlertResponseDto {
    return {
      id: alert.id,
      incidentId: alert.incidentId,
      message: alert.message,
      channel: alert.channel,
      status: alert.status,
      sentAt: alert.sentAt ?? undefined,
      createdAt: alert.createdAt,
    };
  }
}

export { AlertServiceImpl as AlertService };
