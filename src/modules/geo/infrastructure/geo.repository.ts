import { IncidentStatus } from '@prisma/client';
import { prisma } from '@/shared/database/prisma';

export class GeoRepository {
  private prisma = prisma;

  async findActiveIncidents() {
    return this.prisma.incident.findMany({
      where: { status: { in: [IncidentStatus.ACTIVE, IncidentStatus.CONTAINED] } },
      select: {
        id: true,
        name: true,
        severity: true,
        status: true,
        latitude: true,
        longitude: true,
      },
    });
  }

  async findRecentReports() {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.prisma.report.findMany({
      where: { createdAt: { gte: since } },
      select: {
        id: true,
        description: true,
        status: true,
        latitude: true,
        longitude: true,
        createdAt: true,
      },
    });
  }

  async findRiskZones() {
    return this.prisma.riskZone.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        geometry: true,
        riskLevel: true,
      },
    });
  }
}
