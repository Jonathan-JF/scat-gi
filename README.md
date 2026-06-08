# SCAT-GI — Sistema Coordinado de Alertas Tempranas para Gestión de Incendios

**GPY1101 — Evaluación de Proyectos de Software · Duoc UC · Parcial N°3**

> Detectar un foco de incendio 15 minutos antes reduce hasta un **40%** la superficie afectada.
> La Municipalidad Valle del Sol actualmente depende de WhatsApp y llamadas, con un tiempo promedio de detección de **35 minutos**.

---

## Integrantes

| Nombre | Rol |
|---|---|
| Jonathan Alexander Ferrer | Desarrollo |
| Julio Ignacio Soto | Desarrollo |

**Municipalidad Valle del Sol · Región Chimbarongo**

---

## Estado del proyecto

| Componente | Estado |
|---|---|
| Docker (PostgreSQL + Redis) | ✅ Funcionando |
| Backend API (Node.js) | ✅ Funcionando en puerto 3000 |
| Base de datos + migraciones | ✅ Aplicadas |
| Datos semilla | ✅ Cargados |
| Módulo users (auth + JWT) | ✅ Completo |
| Módulo reports | ✅ Completo |
| Módulo incidents | ✅ Completo |
| Módulo alerts (Bull + Twilio) | ✅ Completo |
| Módulo geo (GeoJSON) | ✅ Completo |
| Dashboard web | ✅ Funcionando |
| App móvil | 🔄 Pendiente |

---

## Flujo demostrable (defensa oral)

```
1. Operador hace login en el dashboard
2. Ciudadano envía reporte con foto y GPS
3. Operador ve el reporte en el mapa
4. Operador confirma el reporte como incidente
5. Sistema genera alerta SMS automáticamente (Twilio test)
6. Alerta aparece en el dashboard en tiempo real (Socket.io)
```

---

## Requisitos previos

- Node.js 20 LTS
- Docker Desktop
- Navegador web moderno (Chrome recomendado)

---

## Cómo levantar el sistema

### 1 — Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/scat-gi.git
cd scat-gi
```

### 2 — Levantar Docker

Abre Docker Desktop y espera que esté corriendo. Luego:

```bash
docker-compose up -d
```

Verifica que ambos servicios estén activos:

```bash
docker-compose ps
```

Debes ver `scat-gi-postgres` y `scat-gi-redis` en estado `Up`.

### 3 — Instalar dependencias del backend

```bash
npm install
```

### 4 — Configurar variables de entorno

```bash
cp .env.example .env
```

### 5 — Aplicar migraciones y cargar datos semilla

```bash
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
```

### 6 — Iniciar el backend

```bash
npm run dev
```

Debes ver:

```
✅ Server running on http://localhost:3000
✅ Socket.io ready for dashboard connections
✅ Alert Worker started
```

### 7 — Abrir el dashboard

Abre el archivo `dashboard/index.html` directamente en el navegador (doble clic desde el explorador de archivos).

No requiere instalación adicional ni servidor de frontend.

---

## Credenciales de prueba

### Operador municipal

```
Email:     angelica.cisternas@valledelsol.cl
Contraseña: operator123
```

### Ciudadano

```
Email:     juan.lopez@gmail.com
Contraseña: citizen123
```

---

## Endpoints principales

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/register` | Registro de ciudadano | Público |
| POST | `/api/auth/login` | Login | Público |
| GET | `/api/users/me` | Perfil del usuario | Autenticado |
| POST | `/api/reports` | Crear reporte con GPS | Ciudadano |
| GET | `/api/reports` | Listar reportes | Operador |
| GET | `/api/reports/my` | Mis reportes | Ciudadano |
| PATCH | `/api/reports/:id/status` | Cambiar estado reporte | Operador |
| POST | `/api/incidents` | Confirmar incidente | Operador |
| GET | `/api/incidents` | Listar incidentes activos | Operador |
| GET | `/api/incidents/history` | Historial completo | Operador |
| GET | `/api/alerts` | Listar alertas | Operador |
| GET | `/api/geo/incidents/active` | Incidentes en GeoJSON | Operador |
| GET | `/api/geo/reports/recent` | Reportes 24h en GeoJSON | Operador |
| GET | `/api/geo/risk-zones` | Zonas de riesgo | Operador |
| GET | `/health` | Estado del servidor | Público |

---

## Estructura del repositorio

```text
scat-gi/
├── src/
│   ├── modules/
│   │   ├── users/          # Auth, JWT, roles
│   │   ├── reports/        # Reportes ciudadanos
│   │   ├── incidents/      # Incidentes confirmados
│   │   ├── alerts/         # Alertas + worker Bull
│   │   └── geo/            # Endpoints GeoJSON
│   ├── middleware/         # Auth, errores, validación
│   ├── jobs/               # Worker de alertas Bull
│   ├── config/             # CORS, Redis, JWT
│   └── shared/             # Logger, errores base, Prisma
├── prisma/
│   ├── schema.prisma       # Esquema completo (6 entidades)
│   ├── migrations/         # Migración inicial aplicada
│   └── seed.ts             # 7 usuarios, 4 reportes, 3 zonas de riesgo
├── dashboard/
│   └── index.html          # Dashboard operativo (sin dependencias)
├── docs/
│   ├── arquitectura.md
│   ├── base-de-datos.md
│   └── defensa.md
├── docker-compose.yml      # PostgreSQL 15 + PostGIS + Redis 7
├── .env.example
├── AGENTS.md               # Guía obligatoria del proyecto
└── README.md
```

---

## Arquitectura de capas del backend

Cada módulo sigue la misma estructura de capas:

```
módulo/
├── presentation/    → rutas Express + controllers + DTOs (Zod)
├── application/     → service con lógica de negocio
├── domain/          → tipos, enums y errores del negocio
└── infrastructure/  → repository Prisma + clientes externos
```

El backend es un **monolito modular**. Un solo proceso Node.js con 5 módulos independientes. No usa microservicios.

---

## Flujo de alertas

```
POST /api/incidents
       ↓
IncidentService encola job en Bull
       ↓
Worker consume el job
       ↓
AlertService genera mensaje
       ↓
Twilio envía SMS (modo test)
       ↓
Alerta se registra en PostgreSQL
       ↓
Socket.io emite evento al dashboard
       ↓
Dashboard actualiza en tiempo real
```

---

## Scripts disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor en modo desarrollo

# Base de datos
npm run prisma:seed      # Cargar datos de prueba
npm run prisma:migrate   # Aplicar migraciones pendientes
npm run prisma:reset     # Reiniciar BD completa (PELIGROSO)

# Producción
npm run build            # Compilar TypeScript
npm start                # Iniciar servidor compilado

# Testing
npm test                 # Ejecutar tests unitarios
```

---

## Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| Node.js | 20 LTS | Runtime |
| Express | 5.x | Framework HTTP |
| TypeScript | 5.x | Tipado estático |
| Prisma | 5.x | ORM y migraciones |
| PostgreSQL | 15 | Base de datos |
| PostGIS | 3.x | Datos geoespaciales |
| Redis | 7 | Cola de trabajos |
| Bull | 4.x | Worker de alertas |
| Socket.io | 4.x | Tiempo real |
| JWT | — | Autenticación |
| Zod | 3.x | Validación |
| Twilio | — | SMS (modo test) |
| Leaflet | 1.9 | Mapa interactivo |

---

## Seguridad y privacidad

- JWT con expiración máxima de 24 horas
- Contraseñas cifradas con bcrypt (salt rounds: 10)
- Rate limiting en endpoints de autenticación
- CORS configurado para localhost
- Solo se almacenan coordenadas del foco reportado, no ubicación domiciliaria del ciudadano
- Cumplimiento **Ley 19.628** de protección de datos personales (Chile)

---

## Documentación adicional

- `docs/arquitectura.md` — Diagrama de componentes y decisiones técnicas
- `docs/base-de-datos.md` — Esquema ER y queries geoespaciales
- `docs/defensa.md` — Guión de defensa oral y banco de preguntas
- `AGENTS.md` — Reglas obligatorias del proyecto (22 secciones)
**Última actualización**: 7 de junio de 2026  
**Estado**: ✅ Esquema Prisma completo y datos semilla cargados  
**Próximo paso**: Crear módulos del backend (Users, Reports, Incidents, Alerts, Geo)
