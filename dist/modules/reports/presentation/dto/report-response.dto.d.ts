export type ReportResponseDto = {
    id: string;
    citizenId: string;
    description: string;
    photoUrl?: string;
    videoUrl?: string;
    latitude: number;
    longitude: number;
    status: string;
    createdAt: Date;
};
export type ReportListResponseDto = {
    success: boolean;
    data: ReportResponseDto[];
};
export type ReportDetailResponseDto = {
    success: boolean;
    data: ReportResponseDto;
};
//# sourceMappingURL=report-response.dto.d.ts.map