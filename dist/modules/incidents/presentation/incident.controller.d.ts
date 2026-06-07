import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware';
import { IncidentService } from '../application/incident.service.impl';
export declare class IncidentController {
    private incidentService;
    constructor(incidentService: IncidentService);
    create: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findActive: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findHistory: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=incident.controller.d.ts.map