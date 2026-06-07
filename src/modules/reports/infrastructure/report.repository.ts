import { Report, ReportStatus } from '@prisma/client';
import { prisma } from '@/shared/database/prisma';

export class ReportRepository {
  private prisma = prisma;

  async create(data: {
    citizenId: string;
    description: string;
    photoUrl?: string;
    videoUrl?: string;
    latitude: number;
    longitude: number;
  }): Promise<Report> {
    return this.prisma.report.create({
      data: {
        citizenId: data.citizenId,
        description: data.description,
        photoUrl: data.photoUrl,
        videoUrl: data.videoUrl,
        latitude: data.latitude,
        longitude: data.longitude,
        status: ReportStatus.PENDING,
      },
    });
  }

  async findById(id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async findAll(): Promise<Report[]> {
    return this.prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findByCitizenId(citizenId: string): Promise<Report[]> {
    return this.prisma.report.findMany({
      where: { citizenId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: ReportStatus): Promise<Report> {
    return this.prisma.report.update({
      where: { id },
      data: { status },
    });
  }
}
