export type IncidentResponseDto = {
    id: string;
    reportId?: string;
    operatorId?: string;
    name: string;
    description?: string;
    severity: string;
    status: string;
    latitude: number;
    longitude: number;
    startedAt: Date;
    resolvedAt?: Date;
    createdAt: Date;
};
export type IncidentListResponseDto = {
    success: boolean;
    data: IncidentResponseDto[];
};
export type IncidentDetailResponseDto = {
    success: boolean;
    data: IncidentResponseDto;
};
//# sourceMappingURL=incident-response.dto.d.ts.map