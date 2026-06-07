import { Response } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth.middleware';
import { GeoService } from '../application/geo.service';

export class GeoController {
  constructor(private geoService: GeoService) {}

  getActiveIncidents = async (_req: AuthenticatedRequest, res: Response) => {
    const data = await this.geoService.getActiveIncidentsGeoJson();
    return res.status(200).json({ success: true, data });
  };

  getRecentReports = async (_req: AuthenticatedRequest, res: Response) => {
    const data = await this.geoService.getRecentReportsGeoJson();
    return res.status(200).json({ success: true, data });
  };

  getRiskZones = async (_req: AuthenticatedRequest, res: Response) => {
    const data = await this.geoService.getRiskZonesGeoJson();
    return res.status(200).json({ success: true, data });
  };
}
