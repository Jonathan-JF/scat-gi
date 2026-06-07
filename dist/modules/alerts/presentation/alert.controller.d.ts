import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware';
import { AlertService } from '../application/alert.service.impl';
export declare class AlertController {
    private alertService;
    constructor(alertService: AlertService);
    findActive: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    retry: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=alert.controller.d.ts.map