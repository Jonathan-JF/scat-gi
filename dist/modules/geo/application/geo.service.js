"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoService = void 0;
class GeoService {
    constructor(geoRepository) {
        this.geoRepository = geoRepository;
    }
    async getActiveIncidentsGeoJson() {
        const incidents = await this.geoRepository.findActiveIncidents();
        return {
            type: 'FeatureCollection',
            features: incidents.map((incident) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [incident.longitude, incident.latitude],
                },
                properties: {
                    id: incident.id,
                    name: incident.name,
                    severity: incident.severity,
                    status: incident.status,
                },
            })),
        };
    }
    async getRecentReportsGeoJson() {
        const reports = await this.geoRepository.findRecentReports();
        return {
            type: 'FeatureCollection',
            features: reports.map((report) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [report.longitude, report.latitude],
                },
                properties: {
                    id: report.id,
                    description: report.description,
                    status: report.status,
                    createdAt: report.createdAt,
                },
            })),
        };
    }
    async getRiskZonesGeoJson() {
        const zones = await this.geoRepository.findRiskZones();
        return {
            type: 'FeatureCollection',
            features: zones.map((zone) => ({
                type: 'Feature',
                geometry: zone.geometry,
                properties: {
                    id: zone.id,
                    name: zone.name,
                    description: zone.description,
                    riskLevel: zone.riskLevel,
                },
            })),
        };
    }
}
exports.GeoService = GeoService;
//# sourceMappingURL=geo.service.js.map