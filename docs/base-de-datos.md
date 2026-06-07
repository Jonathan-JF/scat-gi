# Base de Datos — SCAT-GI

## 📊 Esquema de Base de Datos

### Motor y Extensiones

- **Motor**: PostgreSQL 15
- **Extensión Geoespacial**: PostGIS 3.x
- **ORM**: Prisma 5.x
- **Ubicación del esquema**: `prisma/schema.prisma`

---

## 🏛️ Diagrama Entidad-Relación (ER)

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (UNIQUE)  │
│ phone           │
│ password (hash) │
│ role            │◄─────────┐
│ createdAt       │           │
│ updatedAt       │           │
└────────┬────────┘           │
         │                    │
         ├─────────────┐      │
         │             │      │
    ┌────▼──────┐ ┌───▼──────┴──┐
    │   Report  │ │  Incident   │
    ├──────────┤ ├─────────────┤
    │ id (PK)  │ │ id (PK)     │
    │ citizenId│ │ reportId(FK)│
    │ latitude │ │ operatorId  │
    │ longitude│ │ latitude    │
    │ photoUrl │ │ longitude   │
    │ status   │ │ severity    │
    │createdAt │ │ status      │
    └────┬─────┘ └──────┬──────┘
         │              │
         │         ┌────▼────────┐
         │         │    Alert    │
         │         ├─────────────┤
         │         │ id (PK)     │
         │         │incidentId(FK)
         │         │ message     │
         │         │ channel     │
         │         │ status      │
         │         │ sentAt      │
         │         └────┬────────┘
         │              │
         │         ┌────▼──────────────┐
         └────────►│ Notification      │
                   ├───────────────────┤
                   │ id (PK)           │
                   │ alertId (FK)      │
                   │ userId (FK)       │
                   │ deliveredAt       │
                   └───────────────────┘

┌──────────────────┐
│    RiskZone      │
├──────────────────┤
│ id (PK)          │
│ name (UNIQUE)    │
│ description      │
│ geometry (GeoJSON)
│ riskLevel        │
│ createdAt        │
│ updatedAt        │
└──────────────────┘
```

---

## 📋 Definición de Entidades

### 1. **User** — Usuarios del Sistema

Almacena información de ciudadanos y operadores municipales.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `name` | String | NOT NULL | Nombre completo |
| `email` | String | UNIQUE, NOT NULL | Email único |
| `phone` | String | OPTIONAL | Teléfono de contacto |
| `password` | String | NOT NULL | Bcrypt hash (10 rounds) |
| `role` | Enum | NOT NULL | CITIZEN \| OPERATOR \| ADMIN |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `email` (UNIQUE)
- `role` (búsqueda de operadores)

**Relaciones**:
- 1:N con `Report` (creador)
- 1:N con `Incident` (operador que confirma)
- 1:N con `Notification` (destinatario)

---

### 2. **Report** — Reportes Ciudadanos

Registra reportes de focos de incendio enviados por ciudadanos.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `citizenId` | String | FK NOT NULL | Referencia a User |
| `description` | String | NOT NULL | Descripción del foco |
| `photoUrl` | String | OPTIONAL | URL de foto almacenada |
| `videoUrl` | String | OPTIONAL | URL de video almacenado |
| `latitude` | Float | NOT NULL | Coordenada latitud (WGS84) |
| `longitude` | Float | NOT NULL | Coordenada longitud (WGS84) |
| `status` | Enum | NOT NULL | PENDING \| REVIEWED \| REJECTED |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `citizenId` (búsqueda de reportes por ciudadano)
- `status` (filtrado por estado)
- `createdAt` (ordenamiento temporal)

**Relaciones**:
- N:1 con `User` (ciudadano que reporta)
- 1:0..1 con `Incident` (incidente confirmado)

---

### 3. **Incident** — Incidentes Confirmados

Registra incidentes oficiales confirmados por operadores a partir de reportes.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `reportId` | String | FK OPTIONAL | Referencia a Report |
| `operatorId` | String | FK OPTIONAL | Referencia a User (operador) |
| `name` | String | NOT NULL | Nombre del incidente |
| `description` | String | OPTIONAL | Descripción detallada |
| `severity` | Enum | NOT NULL | LOW \| MEDIUM \| HIGH \| CRITICAL |
| `status` | Enum | NOT NULL | ACTIVE \| CONTAINED \| RESOLVED |
| `latitude` | Float | NOT NULL | Coordenada latitud |
| `longitude` | Float | NOT NULL | Coordenada longitud |
| `startedAt` | DateTime | NOT NULL | Cuándo comenzó el incidente |
| `resolvedAt` | DateTime | OPTIONAL | Cuándo se resolvió |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `operatorId` (búsqueda de incidentes por operador)
- `status` (filtrado de incidentes activos)
- `severity` (priorización)
- `createdAt` (ordenamiento temporal)

**Relaciones**:
- N:1 con `Report` (reporte que lo originó)
- N:1 con `User` (operador que confirmó)
- 1:N con `Alert` (alertas generadas)

---

### 4. **Alert** — Alertas Emitidas

Registra alertas emitidas al confirmar incidentes.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `incidentId` | String | FK NOT NULL | Referencia a Incident |
| `message` | String | NOT NULL | Texto del mensaje SMS/PUSH |
| `channel` | Enum | NOT NULL | SMS \| PUSH \| IN_APP |
| `status` | Enum | NOT NULL | PENDING \| SENT \| FAILED |
| `sentAt` | DateTime | OPTIONAL | Cuándo se envió |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `incidentId` (búsqueda de alertas por incidente)
- `status` (filtrado de alertas fallidas)
- `channel` (análisis por canal)

**Relaciones**:
- N:1 con `Incident` (incidente que dispara la alerta)
- 1:N con `Notification` (notificaciones enviadas)

---

### 5. **Notification** — Notificaciones a Usuarios

Registra entregas de notificaciones a usuarios.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `alertId` | String | FK NOT NULL | Referencia a Alert |
| `userId` | String | FK NOT NULL | Referencia a User |
| `deliveredAt` | DateTime | OPTIONAL | Cuándo se entregó |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `alertId` (búsqueda de notificaciones por alerta)
- `userId` (búsqueda de notificaciones por usuario)
- `deliveredAt` (filtrado de no entregadas)

**Relaciones**:
- N:1 con `Alert` (alerta que se notifica)
- N:1 con `User` (usuario que recibe)

---

### 6. **RiskZone** — Zonas de Riesgo Predefinidas

Almacena polígonos de zonas de riesgo de incendio predefinidas.

| Campo | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | String (CUID) | PK | Identificador único |
| `name` | String | UNIQUE, NOT NULL | Nombre de la zona |
| `description` | String | OPTIONAL | Descripción |
| `geometry` | Json | NOT NULL | GeoJSON Polygon |
| `riskLevel` | Int | NOT NULL | 1-5 (1=bajo, 5=crítico) |
| `createdAt` | DateTime | NOT NULL | Timestamp de creación |
| `updatedAt` | DateTime | NOT NULL | Timestamp de actualización |

**Índices**:
- `name` (UNIQUE, búsqueda por nombre)
- `riskLevel` (filtrado por nivel)

---

## 🌱 Datos Semilla (Seed)

El archivo `prisma/seed.js` carga automáticamente:

### Usuarios (7 total)
- **2 Operadores** municipales
- **5 Ciudadanos** para reportes

### Reportes (4)
Ubicados en diferentes sectores con coordenadas georreferenciadas.

### Incidentes (2)
Confirmados por operadores con severidad asignada.

### Alertas (2)
Alertas SMS generadas automáticamente.

### Zonas de Riesgo (3)
Zonas predefinidas con niveles de riesgo 2, 4 y 5.

---

## 📊 Migraciones

```bash
# Aplicar migraciones
npx prisma migrate deploy

# Ver estado
npx prisma migrate status

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion
```

---

**Última actualización**: 7 de junio de 2026  
**Estado**: ✅ Esquema completo, datos semilla cargados
