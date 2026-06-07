import { AlertRepository } from '../infrastructure/alert.repository';
import { TwilioClient } from '../infrastructure/twilio.client';
import { AlertDetailResponseDto, AlertListResponseDto } from '../presentation/dto/alert-response.dto';
import { IAlertService } from './alert.service';
export declare class AlertServiceImpl implements IAlertService {
    private alertRepository;
    private twilioClient;
    constructor(alertRepository: AlertRepository, twilioClient: TwilioClient);
    processIncident(incidentId: string): Promise<void>;
    findActive(): Promise<AlertListResponseDto>;
    findById(id: string): Promise<AlertDetailResponseDto>;
    retry(id: string): Promise<AlertDetailResponseDto>;
    private mapToDto;
}
export { AlertServiceImpl as AlertService };
//# sourceMappingURL=alert.service.impl.d.ts.map