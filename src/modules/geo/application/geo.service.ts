import { GeoRepository } from '../infrastructure/geo.repository';

type GeoJsonFeatureCollection = {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: { type: string; coordinates: number[] | number[][][] };
    properties: Record<string, unknown>;
  }>;
};

export class GeoService {
  constructor(private geoRepository: GeoRepository) {}

  async getActiveIncidentsGeoJson(): Promise<GeoJsonFeatureCollection> {
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

  async getRecentReportsGeoJson(): Promise<GeoJsonFeatureCollection> {
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

  async getRiskZonesGeoJson(): Promise<GeoJsonFeatureCollection> {
    const zones = await this.geoRepository.findRiskZones();
    return {
      type: 'FeatureCollection',
      features: zones.map((zone) => ({
        type: 'Feature',
        geometry: zone.geometry as { type: string; coordinates: number[][][] },
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
