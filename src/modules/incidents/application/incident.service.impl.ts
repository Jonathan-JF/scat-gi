import { Incident, IncidentSeverity, ReportStatus } from '@prisma/client';
import { alertQueue } from '@/config/queue.config';
import { IncidentRepository } from '../infrastructure/incident.repository';
import { IncidentError } from '../domain/incident.errors';
import { CreateIncidentDto } from '../presentation/dto/create-incident.dto';
import { UpdateIncidentStatusDto } from '../presentation/dto/update-incident-status.dto';
import {
  IncidentDetailResponseDto,
  IncidentListResponseDto,
  IncidentResponseDto,
} from '../presentation/dto/incident-response.dto';
import { IIncidentService } from './incident.service';

export class IncidentServiceImpl implements IIncidentService {
  constructor(private incidentRepository: IncidentRepository) {}

  async create(dto: CreateIncidentDto, operatorId: string): Promise<IncidentDetailResponseDto> {
    const report = await this.incidentRepository.findReportById(dto.reportId);
    if (!report) {
      throw new IncidentError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
    }
    if (report.status !== ReportStatus.PENDING) {
      throw new IncidentError('REPORT_ALREADY_PROCESSED', 409, 'El reporte ya fue procesado');
    }

    const incident = await this.incidentRepository.create({
      reportId: dto.reportId,
      operatorId,
      name: dto.name,
      description: dto.description,
      severity: dto.severity as IncidentSeverity,
      latitude: report.latitude,
      longitude: report.longitude,
    });

    await alertQueue.add('process-alert', { incidentId: incident.id });

    return { success: true, data: this.mapToDto(incident) };
  }

  async findActive(): Promise<IncidentListResponseDto> {
    const incidents = await this.incidentRepository.findActive();
    return { success: true, data: incidents.map((i) => this.mapToDto(i)) };
  }

  async findById(id: string): Promise<IncidentDetailResponseDto> {
    const incident = await this.incidentRepository.findById(id);
    if (!incident) {
      throw new IncidentError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
    }
    return { success: true, data: this.mapToDto(incident) };
  }

  async updateStatus(id: string, dto: UpdateIncidentStatusDto): Promise<IncidentDetailResponseDto> {
    const incident = await this.incidentRepository.findById(id);
    if (!incident) {
      throw new IncidentError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
    }

    const updated = await this.incidentRepository.updateStatus(id, dto.status);
    return { success: true, data: this.mapToDto(updated) };
  }

  async findHistory(page = 1, limit = 20) {
    const { items, total } = await this.incidentRepository.findHistory(page, limit);
    return {
      success: true,
      data: items.map((i) => this.mapToDto(i)),
      meta: { page, limit, total },
    };
  }

  private mapToDto(incident: Incident): IncidentResponseDto {
    return {
      id: incident.id,
      reportId: incident.reportId ?? undefined,
      operatorId: incident.operatorId ?? undefined,
      name: incident.name,
      description: incident.description ?? undefined,
      severity: incident.severity,
      status: incident.status,
      latitude: incident.latitude,
      longitude: incident.longitude,
      startedAt: incident.startedAt,
      resolvedAt: incident.resolvedAt ?? undefined,
      createdAt: incident.createdAt,
    };
  }
}

export { IncidentServiceImpl as IncidentService };
