"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_config_1 = require("./config/cors.config");
const error_middleware_1 = require("./middleware/error.middleware");
const user_routes_1 = __importDefault(require("./modules/users/presentation/user.routes"));
const report_routes_1 = __importDefault(require("./modules/reports/presentation/report.routes"));
const incident_routes_1 = __importDefault(require("./modules/incidents/presentation/incident.routes"));
const alert_routes_1 = __importDefault(require("./modules/alerts/presentation/alert.routes"));
const geo_routes_1 = __importDefault(require("./modules/geo/presentation/geo.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_config_1.corsConfig);
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.use('/api', user_routes_1.default);
app.use('/api', report_routes_1.default);
app.use('/api', incident_routes_1.default);
app.use('/api', alert_routes_1.default);
app.use('/api', geo_routes_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map