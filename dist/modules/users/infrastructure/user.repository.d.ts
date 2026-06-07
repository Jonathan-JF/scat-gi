import { User as PrismaUser } from '@prisma/client';
export declare class UserRepository {
    private prisma;
    findByEmail(email: string): Promise<PrismaUser | null>;
    findById(id: string): Promise<PrismaUser | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role: string;
    }): Promise<PrismaUser>;
    update(id: string, data: Partial<PrismaUser>): Promise<PrismaUser>;
    delete(id: string): Promise<PrismaUser>;
    findAll(): Promise<PrismaUser[]>;
}
//# sourceMappingURL=user.repository.d.ts.map