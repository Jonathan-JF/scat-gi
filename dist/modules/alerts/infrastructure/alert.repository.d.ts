import { Alert, AlertChannel, AlertStatus } from '@prisma/client';
export declare class AlertRepository {
    private prisma;
    create(data: {
        incidentId: string;
        message: string;
        channel?: AlertChannel;
        status: AlertStatus;
        sentAt?: Date;
    }): Promise<Alert>;
    findById(id: string): Promise<Alert | null>;
    findActive(): Promise<Alert[]>;
    updateStatus(id: string, status: AlertStatus, sentAt?: Date): Promise<Alert>;
    findIncidentById(incidentId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        latitude: number;
        longitude: number;
        status: import(".prisma/client").$Enums.IncidentStatus;
        reportId: string | null;
        operatorId: string | null;
        severity: import(".prisma/client").$Enums.IncidentSeverity;
        startedAt: Date;
        resolvedAt: Date | null;
    } | null>;
    createNotification(alertId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deliveredAt: Date | null;
        alertId: string;
    }>;
    findCitizens(): Promise<{
        name: string;
        email: string;
        password: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=alert.repository.d.ts.map