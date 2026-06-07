import { Incident, IncidentSeverity, IncidentStatus, ReportStatus } from '@prisma/client';
import { prisma } from '@/shared/database/prisma';

export class IncidentRepository {
  private prisma = prisma;

  async create(data: {
    reportId: string;
    operatorId: string;
    name: string;
    description?: string;
    severity: IncidentSeverity;
    latitude: number;
    longitude: number;
  }): Promise<Incident> {
    return this.prisma.$transaction(async (tx) => {
      const incident = await tx.incident.create({
        data: {
          reportId: data.reportId,
          operatorId: data.operatorId,
          name: data.name,
          description: data.description,
          severity: data.severity,
          latitude: data.latitude,
          longitude: data.longitude,
          status: IncidentStatus.ACTIVE,
        },
      });

      await tx.report.update({
        where: { id: data.reportId },
        data: { status: ReportStatus.REVIEWED },
      });

      return incident;
    });
  }

  async findById(id: string): Promise<Incident | null> {
    return this.prisma.incident.findUnique({ where: { id } });
  }

  async findActive(): Promise<Incident[]> {
    return this.prisma.incident.findMany({
      where: { status: { in: [IncidentStatus.ACTIVE, IncidentStatus.CONTAINED] } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findHistory(page: number, limit: number): Promise<{ items: Incident[]; total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.incident.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.incident.count(),
    ]);
    return { items, total };
  }

  async updateStatus(id: string, status: IncidentStatus): Promise<Incident> {
    return this.prisma.incident.update({
      where: { id },
      data: {
        status,
        resolvedAt: status === IncidentStatus.RESOLVED ? new Date() : null,
      },
    });
  }

  async findReportById(reportId: string) {
    return this.prisma.report.findUnique({ where: { id: reportId } });
  }
}
