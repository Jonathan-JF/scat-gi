import { IncidentRepository } from '../infrastructure/incident.repository';
import { CreateIncidentDto } from '../presentation/dto/create-incident.dto';
import { UpdateIncidentStatusDto } from '../presentation/dto/update-incident-status.dto';
import { IncidentDetailResponseDto, IncidentListResponseDto, IncidentResponseDto } from '../presentation/dto/incident-response.dto';
import { IIncidentService } from './incident.service';
export declare class IncidentServiceImpl implements IIncidentService {
    private incidentRepository;
    constructor(incidentRepository: IncidentRepository);
    create(dto: CreateIncidentDto, operatorId: string): Promise<IncidentDetailResponseDto>;
    findActive(): Promise<IncidentListResponseDto>;
    findById(id: string): Promise<IncidentDetailResponseDto>;
    updateStatus(id: string, dto: UpdateIncidentStatusDto): Promise<IncidentDetailResponseDto>;
    findHistory(page?: number, limit?: number): Promise<{
        success: boolean;
        data: IncidentResponseDto[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    private mapToDto;
}
export { IncidentServiceImpl as IncidentService };
//# sourceMappingURL=incident.service.impl.d.ts.map