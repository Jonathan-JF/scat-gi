"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoController = void 0;
class GeoController {
    constructor(geoService) {
        this.geoService = geoService;
        this.getActiveIncidents = async (_req, res) => {
            const data = await this.geoService.getActiveIncidentsGeoJson();
            return res.status(200).json({ success: true, data });
        };
        this.getRecentReports = async (_req, res) => {
            const data = await this.geoService.getRecentReportsGeoJson();
            return res.status(200).json({ success: true, data });
        };
        this.getRiskZones = async (_req, res) => {
            const data = await this.geoService.getRiskZonesGeoJson();
            return res.status(200).json({ success: true, data });
        };
    }
}
exports.GeoController = GeoController;
//# sourceMappingURL=geo.controller.js.map