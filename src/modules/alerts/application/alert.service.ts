import { AlertDetailResponseDto, AlertListResponseDto } from '../presentation/dto/alert-response.dto';

export interface IAlertService {
  processIncident(incidentId: string): Promise<void>;
  findActive(): Promise<AlertListResponseDto>;
  findById(id: string): Promise<AlertDetailResponseDto>;
  retry(id: string): Promise<AlertDetailResponseDto>;
}
