import { CreateIncidentDto } from '../presentation/dto/create-incident.dto';
import { UpdateIncidentStatusDto } from '../presentation/dto/update-incident-status.dto';
import { IncidentDetailResponseDto, IncidentListResponseDto } from '../presentation/dto/incident-response.dto';
export interface IIncidentService {
    create(dto: CreateIncidentDto, operatorId: string): Promise<IncidentDetailResponseDto>;
    findActive(): Promise<IncidentListResponseDto>;
    findById(id: string): Promise<IncidentDetailResponseDto>;
    updateStatus(id: string, dto: UpdateIncidentStatusDto): Promise<IncidentDetailResponseDto>;
    findHistory(page?: number, limit?: number): Promise<IncidentListResponseDto & {
        meta?: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
}
//# sourceMappingURL=incident.service.d.ts.map