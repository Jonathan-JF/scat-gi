import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware';
import { GeoService } from '../application/geo.service';
export declare class GeoController {
    private geoService;
    constructor(geoService: GeoService);
    getActiveIncidents: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRecentReports: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRiskZones: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=geo.controller.d.ts.map