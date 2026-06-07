import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware';
import { ReportService } from '../application/report.service.impl';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    create: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findAll: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findMyReports: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=report.controller.d.ts.map