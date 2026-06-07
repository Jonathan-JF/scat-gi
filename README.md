# SCAT-GI — Sistema Coordinado de Alertas Tempranas para Gestión de Incendios

## 📋 Descripción del Proyecto

SCAT-GI es un MVP académico desarrollado como parte de la **Evaluación Parcial N°3** de la asignatura **GPY1101 — Evaluación de Proyectos de Software** de Duoc UC. El sistema está orientado a resolver la vulnerabilidad crítica de la Municipalidad Valle del Sol frente a incendios forestales, permitiendo que ciudadanos reporten focos de incendio con geolocalización y foto, mientras que operadores municipales coordinan respuestas en tiempo real a través de un dashboard interactivo.

### 🎯 Objetivo Principal

Detectar focos de incendio **15 minutos antes** de lo que permite el sistema actual (WhatsApp y llamadas telefónicas), lo que reduce la superficie afectada hasta un **40%**.

### 📊 Contexto de Evaluación

- **Tipo de Evaluación**: Parcial N°3 (25% de la calificación final)
- **Ponderación**:
  - Informe grupal: 20%
  - MVP Funcional: 10%
  - Defensa oral (individual): 70%
- **Equipo**: 4-5 integrantes
- **Tiempo asignado**: 5 horas en Sala de Proyectos

---

## 🏗️ Arquitectura del Sistema

El sistema consta de tres componentes principales:

### 1. **Backend API** (Node.js + Express + TypeScript)
- Gestión de usuarios (ciudadanos y operadores)
- Procesamiento de reportes ciudadanos
- Gestión de incidentes y alertas
- Almacenamiento de datos georreferenciados con PostGIS
- Colas de trabajo con Bull y Redis

### 2. **Dashboard Web** (React + Vite + TypeScript)
- Visualización de reportes en mapa interactivo (Leaflet)
- Gestión de incidentes activos
- KPIs operacionales en tiempo real
- Actualización por Socket.io

### 3. **App Móvil Ciudadana** (React Native + Expo)
- Registro e inicio de sesión de ciudadanos
- Captura de foto/video del foco reportado
- Obtención automática de coordenadas GPS
- Recepción de alertas en tiempo real

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 20 LTS
- **Docker** y **Docker Compose**
- **npm** o **yarn**
- **Expo CLI** (para la app móvil)
- **PostgreSQL 15** con PostGIS (incluido en Docker Compose)
- **Redis 7** (incluido en Docker Compose)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/scat-gi.git
cd scat-gi
```

### 2. Levantar la Infraestructura (Docker Compose)

PostgreSQL y Redis ya están configurados en el `docker-compose.yml`. Para levantarlos:

```bash
docker-compose up -d
```

Verifica que ambos servicios estén corriendo:

```bash
docker-compose ps
```

### 3. Instalación del Backend

```bash
# Navega al directorio raíz
cd /path/to/scat-gi

# Instala dependencias
npm install

# Configura las variables de entorno
cp .env.example .env

# Genera el cliente de Prisma
npx prisma generate

# Aplica las migraciones de base de datos
npx prisma migrate dev --name init

# Carga los datos de prueba (seed)
npm run prisma:seed
```

### 4. Ejecutar el Backend

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### 5. Configuración del Dashboard Web

```bash
# En otra terminal
cd dashboard

npm install
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`.

### 6. Ejecución de la App Móvil

```bash
# En otra terminal
cd mobile

npm install
npx expo start

# En el emulador/dispositivo:
# Presiona 'w' para web
# Presiona 'a' para Android
# Presiona 'i' para iOS
```

---

## 🗄️ Base de Datos

### Esquema Prisma

El esquema completo está definido en `prisma/schema.prisma` y contiene las siguientes entidades:

#### **User** (Ciudadanos y Operadores)
- `id` (String, PK)
- `name`, `email`, `phone`, `password`
- `role` (CITIZEN, OPERATOR, ADMIN)
- Timestamps: `createdAt`, `updatedAt`

#### **Report** (Reportes Ciudadanos)
- `id` (String, PK)
- `citizenId` (FK a User)
- `description`, `photoUrl`, `videoUrl`
- `latitude`, `longitude` (Geolocalización)
- `status` (PENDING, REVIEWED, REJECTED)
- Timestamps: `createdAt`, `updatedAt`

#### **Incident** (Incidentes Confirmados)
- `id` (String, PK)
- `reportId` (FK a Report, opcional)
- `operatorId` (FK a User)
- `name`, `description`
- `severity` (LOW, MEDIUM, HIGH, CRITICAL)
- `status` (ACTIVE, CONTAINED, RESOLVED)
- `latitude`, `longitude`
- Timestamps: `startedAt`, `resolvedAt`, `createdAt`, `updatedAt`

#### **Alert** (Alertas Emitidas)
- `id` (String, PK)
- `incidentId` (FK a Incident)
- `message`, `channel` (SMS, PUSH, IN_APP)
- `status` (PENDING, SENT, FAILED)
- Timestamps: `sentAt`, `createdAt`, `updatedAt`

#### **Notification** (Notificaciones a Usuarios)
- `id` (String, PK)
- `alertId` (FK a Alert)
- `userId` (FK a User)
- Timestamps: `deliveredAt`, `createdAt`, `updatedAt`

#### **RiskZone** (Zonas de Riesgo Predefinidas)
- `id` (String, PK)
- `name`, `description`
- `geometry` (GeoJSON Polygon)
- `riskLevel` (1-5)
- Timestamps: `createdAt`, `updatedAt`

### Migraciones

Las migraciones están en `prisma/migrations/`. Para aplicar las migraciones:

```bash
npx prisma migrate deploy
```

Para ver el estado actual de la base de datos:

```bash
npx prisma studio
```

---

## 🌱 Datos de Prueba

El archivo `prisma/seed.ts` carga automáticamente los siguientes datos:

### Usuarios
- **2 Operadores** con email y contraseña
- **5 Ciudadanos** para reportes de prueba

### Reportes Ciudadanos
- **4 reportes de ejemplo** con ubicaciones diferentes

### Incidentes
- **2 incidentes confirmados** con severidad asignada

### Alertas
- **2 alertas SMS** asociadas a incidentes

### Zonas de Riesgo
- **3 zonas predefinidas** con diferentes niveles de riesgo

### Credenciales de Prueba

```
Operador:
  Email: angelica.cisternas@valledelsol.cl
  Contraseña: operator123

Ciudadano:
  Email: juan.lopez@gmail.com
  Contraseña: citizen123
```

---

## 📚 Documentación

### Archivos de Documentación

- **`docs/arquitectura.md`** — Diagrama de componentes y decisiones técnicas
- **`docs/base-de-datos.md`** — Esquema ER y queries geoespaciales
- **`docs/api-endpoints.md`** — Lista completa de endpoints con ejemplos
- **`docs/flujos-de-negocio.md`** — Flujos principales del sistema
- **`docs/defensa.md`** — Preparación para la defensa oral

### Estructura del Repositorio

```text
scat-gi/
├── backend/                 # API Node.js (próximo paso)
├── dashboard/               # Dashboard React + Vite
├── mobile/                  # App React Native
├── docs/                    # Documentación del proyecto
├── prisma/
│   ├── schema.prisma        # Esquema de base de datos
│   ├── migrations/          # Migraciones Prisma
│   ├── seed.ts             # Datos semilla
│   └── seed.js             # Datos semilla (compilado)
├── docker-compose.yml
├── .env.example
├── package.json
├── README.md
├── AGENTS.md                # Guía obligatoria del proyecto
└── init-postgis.sql        # Script de inicialización PostGIS
```

---

## 🔄 Flujo de Alertas (Sistema Crítico)

El sistema de alertas es asincrónico mediante colas Bull + Redis:

1. **Operador confirma un reporte** → Crea un incidente
2. **Backend encola job** `process-alert` en Bull
3. **Worker consume el job** y ejecuta:
   - Genera mensaje de alerta
   - Envía SMS vía Twilio (modo test)
   - Registra el estado en base de datos
   - Emite evento Socket.io al dashboard
4. **Dashboard actualiza** en tiempo real
5. **Ciudadano recibe** alerta en app móvil

---

## 🔐 Seguridad

### Autenticación
- JWT con expiración de **24 horas máximo**
- Solo userId, role y exp en el payload
- Rate limiting en endpoints de autenticación

### Autorización
- Operadores: acceso a `/reports`, `/incidents`, `/alerts`, `/geo`
- Ciudadanos: acceso a `/reports` (POST), `/reports/my`, `/alerts` (GET)

### Privacidad (Ley 19.628)
- Solo se almacenan coordenadas del foco, no ubicación domiciliaria
- Reportes no visibles a otros ciudadanos
- Cifrado de contraseñas con bcrypt (salt: 10)

### Configuración CORS
```javascript
CORS habilitado para:
  - Frontend: http://localhost:3000
  - Mobile: exp://localhost:8081
```

---

## 📊 Tecnologías

| Componente | Tecnología | Versión |
|---|---|---|
| Runtime | Node.js | 20 LTS |
| Framework Backend | Express | 5.x |
| Lenguaje | TypeScript | 5.x |
| ORM | Prisma | 5.x |
| Base de Datos | PostgreSQL | 15 |
| Extensión Geo | PostGIS | 3.x |
| Colas | Bull | 4.x |
| Cache/Sesiones | Redis | 7 |
| Tiempo Real | Socket.io | 4.x |
| Autenticación | JWT | - |
| Validación | Zod | 3.x |
| Hashing | bcrypt | - |
| Frontend Web | React | 18 |
| Bundler Web | Vite | 5.x |
| Mapas Web | Leaflet | 4.x |
| Framework Móvil | React Native | 0.74 |
| Toolchain Móvil | Expo | 51 |

---

## 🧪 Pruebas

```bash
# Ejecutar tests unitarios
npm test

# Ver cobertura de pruebas
npm run test:coverage

# Tests con watch mode
npm run test:watch
```

---

## 📋 Checklist de Funcionalidades

### Backend ✅
- [ ] API corriendo en puerto 3000 con Docker Compose
- [ ] Endpoints de autenticación funcionales
- [ ] CRUD de reportes ciudadanos con geolocalización
- [ ] Creación de incidentes desde reportes
- [ ] Sistema de alertas automáticas por Bull + Redis
- [ ] SMS en modo test de Twilio
- [ ] Eventos Socket.io al dashboard
- [ ] Endpoints GeoJSON para el mapa
- [ ] Migraciones Prisma aplicadas
- [ ] Datos semilla cargados

### Dashboard ✅
- [ ] Mapa interactivo con Leaflet
- [ ] Lista de reportes
- [ ] Gestión de incidentes
- [ ] Actualización en tiempo real (Socket.io)
- [ ] KPIs en pantalla principal

### App Móvil
- [ ] Login y registro de ciudadanos
- [ ] Captura de foto + GPS
- [ ] Envío de reportes
- [ ] Lista de alertas activas
- [ ] Manejo de permisos

---

## 🛠️ Scripts Disponibles

```bash
# Base de datos
npm run prisma:migrate     # Aplicar migraciones
npm run prisma:seed        # Cargar datos de prueba
npm run prisma:reset       # Reiniciar base de datos (PELIGROSO)

# Desarrollo
npm run dev                # Iniciar servidor en modo desarrollo

# Producción
npm run build              # Compilar TypeScript
npm start                  # Iniciar servidor compilado

# Testing
npm test                   # Ejecutar tests
npm run test:watch        # Tests con watch

# Utilidades
npm run lint              # Ejecutar linter
npm run format            # Formatear código
```

---

## 📞 Contacto y Contribuciones

Este es un proyecto académico. Si tienes preguntas o sugerencias:

1. Consulta la documentación en `docs/`
2. Revisa el AGENTS.md para las reglas obligatorias
3. Abre un issue en GitHub

---

## 📄 Licencia

Este proyecto es parte de la evaluación académica de Duoc UC. Consulta el AGENTS.md para términos específicos de uso.

---

**Última actualización**: 7 de junio de 2026  
**Estado**: ✅ Esquema Prisma completo y datos semilla cargados  
**Próximo paso**: Crear módulos del backend (Users, Reports, Incidents, Alerts, Geo)
