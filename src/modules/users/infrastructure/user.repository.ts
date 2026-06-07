import { User as PrismaUser } from '@prisma/client';
import { prisma } from '@/shared/database/prisma';

export class UserRepository {
  private prisma = prisma;

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
  }): Promise<PrismaUser> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role as any,
      },
    });
  }

  async update(id: string, data: Partial<PrismaUser>): Promise<PrismaUser> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PrismaUser> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }
}
