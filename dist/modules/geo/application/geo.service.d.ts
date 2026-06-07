import { GeoRepository } from '../infrastructure/geo.repository';
type GeoJsonFeatureCollection = {
    type: 'FeatureCollection';
    features: Array<{
        type: 'Feature';
        geometry: {
            type: string;
            coordinates: number[] | number[][][];
        };
        properties: Record<string, unknown>;
    }>;
};
export declare class GeoService {
    private geoRepository;
    constructor(geoRepository: GeoRepository);
    getActiveIncidentsGeoJson(): Promise<GeoJsonFeatureCollection>;
    getRecentReportsGeoJson(): Promise<GeoJsonFeatureCollection>;
    getRiskZonesGeoJson(): Promise<GeoJsonFeatureCollection>;
}
export {};
//# sourceMappingURL=geo.service.d.ts.map