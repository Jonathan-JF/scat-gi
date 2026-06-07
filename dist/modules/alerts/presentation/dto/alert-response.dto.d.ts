export type AlertResponseDto = {
    id: string;
    incidentId: string;
    message: string;
    channel: string;
    status: string;
    sentAt?: Date;
    createdAt: Date;
};
export type AlertListResponseDto = {
    success: boolean;
    data: AlertResponseDto[];
};
export type AlertDetailResponseDto = {
    success: boolean;
    data: AlertResponseDto;
};
//# sourceMappingURL=alert-response.dto.d.ts.map