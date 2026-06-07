# AGENTS.md — Guía obligatoria para SCAT-GI

Este archivo define las reglas de trabajo obligatorias para cualquier agente IA, desarrollador o integrante del equipo que intervenga en el repositorio SCAT-GI. Su objetivo es mantener el proyecto alineado con el caso de estudio académico de la asignatura GPY1101 — Evaluación de Proyectos de Software, garantizando una entrega de MVP funcional, defendible y coherente con el contexto del caso.

Ninguna regla de este archivo puede ser ignorada, sobreescrita o reemplazada sin autorización explícita del equipo.

---

## 0. Contexto de evaluación — Parcial N°3 GPY1101

Este proyecto corresponde a la **Evaluación Parcial N°3** de la asignatura GPY1101 — Evaluación de Proyectos de Software. Representa el **25% de la nota final** del curso y se realiza en equipos en la Sala de Proyectos con un tiempo asignado de 5 horas.

### Distribución de ponderaciones dentro de la Parcial

| Dimensión | Tipo | Peso dentro de la Parcial |
|---|---|---|
| Informe grupal | Entrega escrita | 20% |
| MVP Funcional | Demostración técnica | 10% |
| Defensa oral | Presentación individual | 70% |
| **Total** | | **100%** |

La calificación de la defensa oral es **individual**, aunque la presentación es grupal. Cada integrante debe poder responder con precisión técnica cualquier pregunta del banco de preguntas, sobre cualquier temática de la asignatura.

### Implicancias para este repositorio

El 70% de la nota depende de la defensa oral individual. Esto significa que:

- Todo el código producido debe ser explicable y defendible por cualquier integrante del equipo, no solo por quien lo escribió.
- El MVP debe poder demostrarse en vivo desde el dispositivo del equipo o proyectado en la Sala de Proyectos.
- La documentación debe ser suficiente para que cualquier integrante pueda explicar las decisiones técnicas sin depender del código fuente.
- El informe debe cubrir exactamente los tres puntos exigidos por la evaluación (ver sección 16).
- El MVP debe implementar al menos el requerimiento funcional principal identificado en la Parcial 1: **reporte ciudadano de foco de incendio con geolocalización y foto**.

---

## 1. Propósito del proyecto

SCAT-GI (Sistema Coordinado de Alertas Tempranas para Gestión de Incendios) es un MVP académico orientado a resolver la vulnerabilidad crítica de la Municipalidad Valle del Sol frente a incendios forestales. El sistema actual depende de WhatsApp y llamadas telefónicas, generando retrasos de detección de 35 minutos en promedio. Detectar un foco 15 minutos antes reduce hasta un 40% la superficie afectada.

El sistema se compone de tres partes principales:

- **App móvil ciudadana**: permite a vecinos reportar focos de incendio con foto, video y geolocalización.
- **Dashboard operativo municipal**: permite al equipo de emergencias visualizar reportes en tiempo real, gestionar incidentes y coordinar brigadas sobre un mapa.
- **Backend API**: procesa reportes, gestiona incidentes, dispara alertas automáticas y almacena datos georreferenciados.

El proyecto implementa la Alternativa 3 del análisis de alternativas (Implementación Integral por Etapas) definida en la Evaluación Parcial 2 (Eva2) del caso SCAT-GI.

---

## 2. Alcance del MVP

SCAT-GI es un MVP académico. No es un sistema de producción real ni pretende cubrir todos los casos operativos de una emergencia municipal.

Las decisiones técnicas deben priorizar:

- Funcionalidades demostrables y coherentes con el caso de estudio.
- Código limpio, estructurado y defendible oralmente.
- Arquitectura clara con separación de responsabilidades.
- Documentación suficiente para instalación, ejecución y defensa.

### Funcionalidades dentro del alcance del MVP

- Registro e inicio de sesión de ciudadanos y operadores municipales.
- Envío de reporte ciudadano con foto, descripción y coordenadas GPS.
- Visualización de reportes activos en mapa interactivo (dashboard).
- Creación de incidente oficial a partir de un reporte.
- Generación de alerta automática al confirmar un incidente.
- Envío de notificación SMS simulada (modo test de Twilio).
- Visualización de alertas activas en la app móvil ciudadana.
- Historial de incidentes con estado, fecha y ubicación.
- KPIs básicos en el dashboard: incidentes activos, reportes del día, tiempo promedio de respuesta.
- Base de datos histórica de incidentes georreferenciados.

### Funcionalidades fuera del alcance del MVP

- Integración real con APIs de Bomberos, CONAF o SENAPRED (se simulan con stubs).
- SMS en modo producción con cargos reales.
- Análisis predictivo de riesgo de incendio.
- Tracking GPS en tiempo real de brigadas.
- Módulo de evacuación automatizada.
- API pública para organismos externos.
- Panel administrativo avanzado.
- Aplicación de escritorio.

No agregar funcionalidades fuera de este alcance sin autorización explícita del equipo.

---

## 3. Estructura del repositorio

La estructura esperada del repositorio es la siguiente:

```text
scat-gi/
├── backend/                     # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── modules/
│   │   │   ├── reports/         # Módulo de reportes ciudadanos
│   │   │   ├── incidents/       # Módulo de incidentes municipales
│   │   │   ├── alerts/          # Módulo de alertas y notificaciones
│   │   │   ├── users/           # Módulo de usuarios y autenticación
│   │   │   └── geo/             # Módulo de datos geográficos
│   │   ├── config/              # Configuración de servicios externos
│   │   ├── middleware/          # Middleware de autenticación y errores
│   │   ├── jobs/                # Procesamiento de colas (Bull)
│   │   ├── shared/              # Utilidades comunes del backend
│   │   └── app.ts               # Punto de entrada Express
│   ├── prisma/
│   │   ├── schema.prisma        # Esquema de base de datos
│   │   ├── migrations/          # Migraciones generadas por Prisma
│   │   └── seed.ts              # Datos semilla
│   ├── tests/                   # Tests unitarios e integración
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── mobile/                      # App móvil React Native + Expo
│   ├── src/
│   │   ├── screens/             # Pantallas de la app
│   │   ├── components/          # Componentes reutilizables
│   │   ├── services/            # Clientes HTTP y servicios
│   │   ├── store/               # Estado global (Zustand)
│   │   ├── navigation/          # Configuración de navegación
│   │   └── hooks/               # Custom hooks
│   ├── assets/
│   ├── app.json
│   ├── package.json
│   └── README.md
│
├── dashboard/                   # Dashboard web React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/               # Páginas del dashboard
│   │   ├── components/          # Componentes reutilizables
│   │   ├── services/            # Clientes HTTP y WebSocket
│   │   ├── store/               # Estado global (Zustand)
│   │   ├── hooks/               # Custom hooks
│   │   └── layouts/             # Layouts de página
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── docs/                        # Documentación del proyecto
│   ├── arquitectura.md
│   ├── base-de-datos.md
│   ├── api-endpoints.md
│   ├── flujos-de-negocio.md
│   └── defensa.md
│
├── docker-compose.yml
├── README.md
└── AGENTS.md
```

No crear carpetas fuera de esta estructura sin justificación documentada en el README del componente afectado.

---

## 4. Componentes obligatorios

### `backend`

API RESTful construida con Node.js, Express y TypeScript. Es el núcleo del sistema y el único punto de entrada para ambos frontends. Responsabilidades:

- Autenticación y autorización de usuarios (ciudadanos y operadores).
- Recepción y almacenamiento de reportes ciudadanos con coordenadas GPS.
- Gestión del ciclo de vida de incidentes: pendiente → activo → resuelto.
- Disparo y registro de alertas automáticas al confirmar incidentes.
- Envío de notificaciones SMS mediante Twilio en modo test.
- Exposición de datos georreferenciados para el mapa del dashboard.
- Comunicación en tiempo real mediante Socket.io hacia el dashboard.

### `mobile`

Aplicación React Native construida con Expo. Usada por ciudadanos de Valle del Sol. Responsabilidades:

- Registro e inicio de sesión de ciudadanos.
- Captura de foto o video desde la cámara del dispositivo.
- Obtención automática de coordenadas GPS al enviar un reporte.
- Visualización del historial de reportes propios.
- Recepción de alertas activas emitidas por el municipio.

### `dashboard`

Aplicación web React construida con Vite. Usada por el equipo de emergencias de la Municipalidad. Responsabilidades:

- Inicio de sesión de operadores municipales.
- Visualización de reportes ciudadanos en mapa interactivo (Leaflet).
- Confirmación de reportes y creación de incidentes.
- Gestión de estado de incidentes activos.
- Visualización de alertas emitidas y su alcance geográfico.
- KPIs operacionales en pantalla de inicio.
- Actualización en tiempo real mediante WebSocket.

---

## 5. Tecnologías base

El proyecto debe usar exclusivamente las siguientes tecnologías. Cualquier cambio debe justificarse en el README del componente afectado y en el documento `docs/arquitectura.md`.

### Backend

| Tecnología | Versión mínima | Propósito |
|---|---|---|
| Node.js | 20 LTS | Runtime |
| Express | 5.x | Framework HTTP |
| TypeScript | 5.x | Tipado estático |
| Prisma | 5.x | ORM y migraciones |
| PostgreSQL | 15 | Base de datos relacional |
| PostGIS | 3.x | Extensión geoespacial |
| Redis | 7 | Cola de trabajos |
| Bull | 4.x | Procesamiento de colas |
| Socket.io | 4.x | Comunicación en tiempo real |
| JWT | — | Autenticación stateless |
| Zod | 3.x | Validación de schemas |
| Twilio SDK | — | Envío de SMS (modo test) |
| Multer | — | Subida de archivos |
| Jest + Supertest | — | Pruebas |

### App móvil

| Tecnología | Versión mínima | Propósito |
|---|---|---|
| React Native | 0.74 | Framework móvil |
| Expo SDK | 51 | Toolchain simplificado |
| Expo Camera | — | Captura de foto/video |
| Expo Location | — | GPS del dispositivo |
| React Navigation | 6.x | Navegación entre pantallas |
| Zustand | 4.x | Estado global |
| Axios | — | Llamadas HTTP |

### Dashboard web

| Tecnología | Versión mínima | Propósito |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5.x | Bundler |
| TypeScript | 5.x | Tipado estático |
| Leaflet + React-Leaflet | 4.x | Mapa interactivo |
| Socket.io-client | 4.x | WebSocket con backend |
| Zustand | 4.x | Estado global |
| Axios | — | Llamadas HTTP |
| Recharts | — | Gráficos de KPIs |

### Infraestructura

| Tecnología | Propósito |
|---|---|
| Docker + Docker Compose | Orquestación local |
| GitHub | Control de versiones |

---

## 6. Módulos de negocio del backend

El backend está organizado en módulos. Cada módulo es completamente autónomo y representa un área de negocio del sistema. No mezclar responsabilidades entre módulos.

### Módulo `users`

Gestiona ciudadanos y operadores municipales.

Entidades: `User` (id, name, email, password\_hash, role, phone, created\_at).

Roles: `CITIZEN`, `OPERATOR`, `ADMIN`.

Endpoints obligatorios:

- `POST /auth/register` — registro de ciudadano.
- `POST /auth/login` — inicio de sesión (devuelve JWT).
- `GET /users/me` — perfil del usuario autenticado.

### Módulo `reports`

Gestiona los reportes enviados por ciudadanos desde la app móvil.

Entidades: `Report` (id, citizen\_id, description, photo\_url, video\_url, latitude, longitude, status, created\_at).

Estados: `PENDING`, `REVIEWED`, `REJECTED`.

Endpoints obligatorios:

- `POST /reports` — crear reporte (solo ciudadanos, requiere JWT).
- `GET /reports` — listar reportes (solo operadores).
- `GET /reports/:id` — detalle de reporte.
- `PATCH /reports/:id/status` — cambiar estado (solo operadores).
- `GET /reports/my` — reportes del ciudadano autenticado.

### Módulo `incidents`

Gestiona incidentes confirmados por operadores a partir de reportes.

Entidades: `Incident` (id, report\_id, operator\_id, name, description, severity, status, latitude, longitude, started\_at, resolved\_at).

Severidades: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.

Estados: `ACTIVE`, `CONTAINED`, `RESOLVED`.

Endpoints obligatorios:

- `POST /incidents` — crear incidente a partir de un reporte (solo operadores).
- `GET /incidents` — listar incidentes activos.
- `GET /incidents/:id` — detalle de incidente.
- `PATCH /incidents/:id/status` — actualizar estado.
- `GET /incidents/history` — historial completo con paginación.

Al crear un incidente, el módulo debe publicar un evento interno `incident.created` que el módulo `alerts` consume para generar la alerta automática. Este mecanismo se implementa mediante Bull Jobs.

### Módulo `alerts`

Gestiona las alertas emitidas por el sistema y las notificaciones enviadas.

Entidades: `Alert` (id, incident\_id, message, channel, status, sent\_at), `Notification` (id, alert\_id, user\_id, delivered\_at).

Canales: `SMS`, `PUSH`, `IN_APP`.

Endpoints obligatorios:

- `GET /alerts` — listar alertas activas.
- `GET /alerts/:id` — detalle de alerta.
- `POST /alerts/:id/retry` — reintentar envío fallido (solo operadores).

Este módulo consume el evento `incident.created` desde la cola Bull y ejecuta:

1. Generación del mensaje de alerta.
2. Envío de SMS vía Twilio en modo test.
3. Emisión de evento `alert.issued` por Socket.io al dashboard.
4. Registro de la notificación en base de datos.

### Módulo `geo`

Gestiona datos georreferenciados para el mapa del dashboard y la app.

Endpoints obligatorios:

- `GET /geo/incidents/active` — coordenadas de incidentes activos (GeoJSON).
- `GET /geo/reports/recent` — coordenadas de reportes de las últimas 24 horas (GeoJSON).
- `GET /geo/risk-zones` — zonas de riesgo predefinidas (polígonos, datos semilla).

Las respuestas de este módulo deben estar en formato GeoJSON estándar para ser consumidas directamente por Leaflet y React Native Maps.

---

## 7. Arquitectura de capas obligatoria del backend

Todos los módulos del backend deben seguir la misma arquitectura de capas. El objetivo es separar responsabilidades, facilitar pruebas y mantener el código ordenado y defendible.

### Estructura obligatoria por módulo

```text
src/modules/<nombre-modulo>/
├── presentation/
│   ├── <modulo>.routes.ts        # Definición de rutas Express
│   ├── <modulo>.controller.ts    # Controladores: reciben request, delegan a service
│   └── dto/
│       ├── create-<entidad>.dto.ts
│       ├── update-<entidad>.dto.ts
│       └── <entidad>-response.dto.ts
│
├── application/
│   ├── <modulo>.service.ts       # Interfaz del servicio (contrato)
│   └── <modulo>.service.impl.ts  # Implementación con lógica de negocio
│
├── domain/
│   ├── <entidad>.types.ts        # Tipos e interfaces del dominio
│   ├── <entidad>.enums.ts        # Enums del negocio
│   └── <modulo>.errors.ts        # Errores específicos del módulo
│
└── infrastructure/
    ├── <modulo>.repository.ts    # Acceso a datos con Prisma
    └── <modulo>.client.ts        # Cliente externo si aplica (ej. Twilio)
```

### Propósito de cada capa

#### `presentation`

Debe contener únicamente rutas Express, controladores y DTOs.

- Los controllers no deben contener lógica de negocio.
- Los controllers solo reciben el request, validan con Zod, llaman al service y devuelven la respuesta HTTP.
- Los DTOs deben definirse con Zod schemas para validación automática.
- Ningún controller debe retornar una entidad Prisma directamente; siempre usar response DTOs.
- Las rutas deben registrarse en `app.ts` mediante el archivo `<modulo>.routes.ts` correspondiente.

#### `application`

Debe contener los casos de uso y la lógica de negocio del módulo.

- La lógica de negocio principal debe vivir en `<modulo>.service.impl.ts`, no en controllers ni repositories.
- El service debe transformar entre tipos de dominio y DTOs cuando sea necesario.
- El service es el único que puede llamar al repository y a clientes externos.
- No acceder a Prisma directamente desde el controller.

#### `domain`

Debe contener tipos, interfaces, enums y errores del negocio.

- No debe depender de Express, Prisma ni de ningún detalle técnico externo.
- Debe representar los conceptos del negocio: `Report`, `Incident`, `Alert`, `User`, `ReportStatus`, `IncidentSeverity`, etc.
- Los errores de negocio deben extender una clase base `AppError` definida en `shared/errors.ts`.

#### `infrastructure`

Debe contener el acceso a datos y los clientes de servicios externos.

- El repository debe usar Prisma Client para consultar la base de datos.
- No poner consultas Prisma fuera del repository del módulo correspondiente.
- Los clientes externos como Twilio deben tener su propio archivo `<modulo>.client.ts`.
- El repository devuelve tipos del dominio, no objetos Prisma crudos.

### Ejemplo de flujo correcto

Flujo para confirmar un reporte y crear un incidente:

1. `POST /incidents` llega al router de Express.
2. Middleware de autenticación verifica el JWT y adjunta `req.user`.
3. `IncidentController` valida el body con Zod (`CreateIncidentDto`).
4. `IncidentController` llama a `IncidentService.create(dto, operatorId)`.
5. `IncidentService` verifica que el reporte exista y esté en estado `PENDING`.
6. `IncidentService` llama a `IncidentRepository.create(data)`.
7. `IncidentService` encola el job `incident.created` en Bull.
8. `IncidentService` devuelve `IncidentResponseDto`.
9. `IncidentController` responde con `201 Created` y el DTO.
10. El worker de Bull consume el job y llama a `AlertService.processIncident(incidentId)`.
11. `AlertService` genera el SMS, lo envía por Twilio y emite el evento Socket.io.

### Ejemplo de flujo prohibido

```text
IncidentController accede directamente a prisma.incident.create()
y devuelve el objeto Prisma como respuesta JSON.
```

Está mal porque:

- Mezcla presentación con persistencia.
- Expone columnas internas de la base de datos.
- Omite validaciones de negocio.
- Hace el módulo imposible de testear en aislamiento.
- Acopla la API pública al esquema interno de Prisma.

### Checklist obligatoria antes de crear código nuevo

- [ ] ¿El archivo está en la capa correcta del módulo correspondiente?
- [ ] ¿El controller está libre de lógica de negocio y consultas a Prisma?
- [ ] ¿Se usan Zod schemas para validar el request?
- [ ] ¿El controller devuelve un response DTO, no un objeto Prisma?
- [ ] ¿La lógica de negocio está en `service.impl.ts`?
- [ ] ¿El acceso a Prisma está únicamente en el `repository.ts`?
- [ ] ¿El módulo sigue siendo independiente de otros módulos?
- [ ] ¿Los errores de negocio extienden `AppError` y son manejados por `errorMiddleware`?
- [ ] ¿El código nuevo tiene al menos un test unitario?
- [ ] ¿El cambio está dentro del alcance del MVP?

---

## 8. Arquitectura de la app móvil

La app móvil debe seguir una estructura orientada a pantallas y servicios, separando la UI de la lógica de comunicación con la API.

### Estructura obligatoria

```text
mobile/src/
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── report/
│   │   ├── NewReportScreen.tsx      # Captura foto + GPS + descripción
│   │   └── MyReportsScreen.tsx      # Historial de reportes propios
│   └── alerts/
│       └── AlertsScreen.tsx         # Alertas activas del municipio
│
├── components/
│   ├── common/                      # Botones, inputs, loaders compartidos
│   └── report/                      # Componentes específicos de reportes
│
├── services/
│   ├── api.service.ts               # Instancia base de Axios con interceptores
│   ├── auth.service.ts              # Login, register, token storage
│   ├── report.service.ts            # CRUD de reportes
│   └── alert.service.ts             # Consulta de alertas activas
│
├── store/
│   └── auth.store.ts                # Estado de sesión (Zustand)
│
├── navigation/
│   ├── AppNavigator.tsx             # Navegación autenticada
│   └── AuthNavigator.tsx            # Navegación pública
│
└── hooks/
    ├── useLocation.ts               # Hook para obtener GPS del dispositivo
    └── useCamera.ts                 # Hook para captura de imagen/video
```

### Reglas obligatorias de la app móvil

- Las pantallas no deben hacer llamadas HTTP directamente; siempre usar los services.
- El token JWT debe almacenarse con `expo-secure-store`, nunca en `AsyncStorage` en texto plano.
- Las coordenadas GPS deben obtenerse siempre al momento de enviar el reporte, no al abrir la pantalla.
- Solicitar permisos de cámara y ubicación al usuario antes de usarlos; manejar el caso en que el usuario los deniegue.
- No mostrar coordenadas crudas al usuario ciudadano; usar nombres de lugar cuando sea posible.
- Toda pantalla debe tener un estado de carga y un estado de error visible al usuario.
- El token de sesión debe incluirse en el header `Authorization: Bearer <token>` en todas las llamadas autenticadas.

---

## 9. Arquitectura del dashboard web

El dashboard debe seguir una estructura orientada a páginas y componentes, con separación entre UI, lógica de datos y conexión con el backend.

### Estructura obligatoria

```text
dashboard/src/
├── pages/
│   ├── DashboardPage.tsx            # KPIs y resumen operacional
│   ├── MapPage.tsx                  # Mapa con reportes e incidentes activos
│   ├── ReportsPage.tsx              # Lista de reportes ciudadanos
│   ├── IncidentsPage.tsx            # Gestión de incidentes activos e historial
│   └── AlertsPage.tsx               # Registro de alertas emitidas
│
├── components/
│   ├── common/                      # Tabla, botones, badges, modal
│   ├── map/
│   │   ├── IncidentMap.tsx          # Mapa Leaflet con marcadores
│   │   └── ReportMarker.tsx         # Marcador de reporte ciudadano
│   ├── incident/
│   │   ├── IncidentCard.tsx
│   │   └── IncidentStatusBadge.tsx
│   └── dashboard/
│       └── KpiCard.tsx              # Tarjeta de métrica
│
├── services/
│   ├── api.service.ts               # Instancia base Axios
│   ├── report.service.ts
│   ├── incident.service.ts
│   ├── alert.service.ts
│   └── socket.service.ts            # Conexión Socket.io y suscripción a eventos
│
├── store/
│   ├── auth.store.ts
│   └── incidents.store.ts           # Estado de incidentes para actualización reactiva
│
├── hooks/
│   └── useSocket.ts                 # Hook para suscripción a eventos en tiempo real
│
└── layouts/
    ├── AuthLayout.tsx
    └── DashboardLayout.tsx          # Sidebar + header + content
```

### Reglas obligatorias del dashboard

- Las páginas no deben contener lógica de llamadas HTTP; delegar a services.
- El mapa de Leaflet debe mostrar siempre los incidentes activos y los reportes de las últimas 24 horas como capas diferenciadas visualmente.
- Las actualizaciones en tiempo real (nuevos reportes, cambios de estado de incidentes, alertas emitidas) deben llegar por Socket.io y reflejarse en el mapa y la lista sin recargar la página.
- El dashboard principal debe mostrar como mínimo: número de incidentes activos, reportes recibidos hoy, tiempo promedio de respuesta y última alerta emitida.
- Los datos de coordenadas del backend deben usarse directamente en los marcadores de Leaflet sin transformación adicional.
- Todo evento Socket.io recibido debe loguearse en consola durante desarrollo.

---

## 10. Base de datos y PostGIS

### Reglas obligatorias de base de datos

- Usar PostgreSQL 15 como motor de base de datos.
- Activar la extensión PostGIS para almacenar y consultar datos georreferenciados.
- Definir el esquema completo en `backend/prisma/schema.prisma`.
- Usar el tipo `Unsupported("geography(Point, 4326)")` en Prisma para campos geoespaciales hasta que Prisma tenga soporte nativo. Las consultas geoespaciales deben ejecutarse con `prisma.$queryRaw`.
- Definir claves primarias UUID en todas las tablas.
- Definir claves foráneas y constraints de integridad referencial.
- Incluir índices en campos de búsqueda frecuente: `status`, `created_at`, `citizen_id`, `incident_id`.
- Nunca almacenar contraseñas en texto plano; usar `bcrypt` con salt rounds mínimos de 10.
- Proveer datos semilla en `prisma/seed.ts` con al menos: 2 operadores, 5 ciudadanos, 3 zonas de riesgo predefinidas, 4 reportes de ejemplo y 2 incidentes de ejemplo.
- No compartir tablas entre módulos; si dos módulos necesitan el mismo dato, el segundo módulo consume la API del primero o almacena una copia del dato relevante.

### Campos geoespaciales obligatorios

- `Report`: `latitude FLOAT`, `longitude FLOAT` (coordenadas del foco reportado).
- `Incident`: `latitude FLOAT`, `longitude FLOAT` (coordenadas del incidente confirmado).
- `RiskZone`: polígono PostGIS con `Unsupported("geography(Polygon, 4326)")` para zonas de riesgo predefinidas.

Las consultas geoespaciales para el módulo `geo` deben usar funciones PostGIS como `ST_DWithin`, `ST_AsGeoJSON` y `ST_MakePoint`.

---

## 11. Sistema de alertas y colas

El sistema de alertas es crítico para el proyecto. Debe implementarse mediante colas Bull sobre Redis para garantizar que los fallos de envío no afecten el flujo principal de la API.

### Flujo obligatorio de alerta

1. El operador confirma un reporte creando un incidente (`POST /incidents`).
2. `IncidentService` encola el job `process-alert` en Bull con el `incidentId`.
3. El worker en `jobs/alert.job.ts` consume el job.
4. El worker llama a `AlertService.processIncident(incidentId)`.
5. `AlertService` obtiene el incidente y genera el mensaje de alerta.
6. `AlertService` llama a `TwilioClient.sendSMS(message)` en modo test.
7. `AlertService` registra la alerta en la tabla `Alert` con estado `SENT` o `FAILED`.
8. `AlertService` emite el evento `alert:issued` por Socket.io con el payload de la alerta.
9. El dashboard recibe el evento en tiempo real y actualiza el mapa y la lista de alertas.

### Reglas obligatorias del sistema de alertas

- El envío de SMS nunca debe bloquear la respuesta HTTP de `POST /incidents`.
- Si el job falla, Bull debe reintentar hasta 3 veces con backoff exponencial.
- El estado de cada alerta (`PENDING`, `SENT`, `FAILED`) debe registrarse siempre en base de datos.
- El mensaje SMS en modo test debe incluir: nombre del incidente, severidad, coordenadas y hora.
- Las credenciales de Twilio deben leerse desde variables de entorno, nunca hardcodeadas.
- El evento Socket.io `alert:issued` debe emitirse al room `operators` para que solo el dashboard lo reciba.
- Los ciudadanos reciben las alertas consultando el endpoint `GET /alerts` desde la app móvil, no por Socket.io directo.

---

## 12. Seguridad y privacidad

### Reglas obligatorias de seguridad

- Todos los endpoints que no sean `POST /auth/register` y `POST /auth/login` deben requerir JWT válido.
- Los endpoints de operadores (`/reports`, `/incidents`, `/alerts`, `/geo`) deben verificar que el rol sea `OPERATOR` o `ADMIN`.
- Los endpoints de ciudadanos (`/reports` POST, `/reports/my`, `/alerts` GET) deben aceptar rol `CITIZEN`.
- El JWT debe tener expiración de 24 horas como máximo.
- No incluir datos sensibles en el payload del JWT: solo `userId`, `role` y `exp`.
- Implementar rate limiting básico con `express-rate-limit` en los endpoints de autenticación.
- Configurar CORS para aceptar únicamente los orígenes del dashboard y la app móvil.
- Nunca subir archivos `.env` al repositorio; proveer siempre un `.env.example` con las variables necesarias sin valores reales.

### Reglas de cumplimiento de la Ley 19.628 (Protección de Datos Personales)

La Municipalidad Valle del Sol opera bajo la Ley 19.628 de Chile. El MVP debe respetar los siguientes principios:

- Los datos de geolocalización de ciudadanos son datos personales sensibles. Solo deben almacenarse las coordenadas del foco reportado, no la ubicación domiciliaria del ciudadano.
- Los reportes ciudadanos no deben ser visibles a otros ciudadanos; solo operadores autorizados pueden acceder a ellos.
- Los registros de usuarios deben permitir la eliminación de cuenta y de todos sus datos asociados (`DELETE /users/me`).
- No compartir datos de reportes o alertas con terceros fuera del sistema sin autorización explícita.
- Incluir en la documentación una nota que explique qué datos se recopilan y con qué finalidad.

---

## 13. Reglas de código

- Mantener código limpio, ordenado y fácil de leer.
- Usar TypeScript en backend y dashboard. La app móvil puede usar TypeScript o JavaScript; elegir uno y ser consistente.
- Usar nombres en inglés para código (variables, funciones, clases, archivos). Usar español únicamente para comentarios explicativos y mensajes de error visibles al usuario.
- No poner lógica de negocio en controllers ni en componentes de UI.
- Validar siempre los datos de entrada con Zod en el backend antes de procesarlos.
- Manejar todos los errores con respuestas HTTP claras y consistentes usando el formato:
  ```json
  { "success": false, "error": "Mensaje de error", "code": "ERROR_CODE" }
  ```
- Las respuestas exitosas deben usar el formato:
  ```json
  { "success": true, "data": { ... } }
  ```
- No subir secretos, tokens ni contraseñas al repositorio.
- No hardcodear URLs del backend; usar variables de entorno.
- Todo el código nuevo debe compilar sin errores de TypeScript antes de considerarse terminado.
- No dejar `console.log` de depuración en código de producción; usar el logger de `shared/logger.ts`.
- Preferir implementaciones simples y directas sobre abstracciones innecesarias.
- Actualizar el README del componente afectado con cada cambio relevante.

---

## 14. Reglas de pruebas

- El backend debe tener pruebas unitarias para los services de cada módulo.
- Las pruebas deben usar Jest y cubrir como mínimo:
  - Creación de reporte con datos válidos.
  - Rechazo de reporte con datos inválidos o sin coordenadas.
  - Creación de incidente a partir de un reporte existente.
  - Intento de crear incidente desde un reporte ya procesado.
  - Generación de alerta al confirmar un incidente.
- Los repositories deben mockearse en los tests de services; no usar base de datos real en tests unitarios.
- Los controllers deben probarse con Supertest para los endpoints críticos.
- Documentar en `README.md` de backend cómo ejecutar los tests y qué cubren.
- Incluir captura de pantalla o log de los tests pasando como evidencia en `docs/`.
- Las pruebas deben correr con `npm test` sin configuración adicional.

---

## 15. Estrategia de branching

Estrategia simple de ramas:

- `main`: versión estable y demostrable. Siempre debe poder levantarse con Docker Compose.
- `develop`: integración de todos los avances. Base para Pull Requests.
- `feature/nombre-funcionalidad`: desarrollo de nuevas funcionalidades.
- `fix/nombre-error`: corrección de errores.
- `docs/nombre-documento`: cambios exclusivos de documentación.

Reglas de trabajo:

- No trabajar directamente en `main`.
- Todo cambio de funcionalidad debe ir en una rama `feature/` propia.
- Hacer merge únicamente mediante Pull Request hacia `develop`.
- Los Pull Requests deben tener descripción breve de qué cambia y por qué.
- Preparar el merge final de `develop` a `main` solo cuando el MVP esté completo y funcional.
- Usar commits claros y descriptivos en tiempo presente: `add report creation endpoint`, `fix GPS permission handling`, `update incident status flow`.
- Documentar en `docs/` si se resolvió un conflicto de merge relevante.

---

## 16. Documentación obligatoria

El proyecto debe incluir los siguientes documentos. La documentación debe ser suficiente para que un evaluador instale, ejecute y entienda el proyecto sin depender de explicaciones externas.

### `README.md` (raíz del repositorio)

- Descripción del proyecto y contexto del caso SCAT-GI.
- Diagrama o descripción de la arquitectura general.
- Requisitos previos (Node.js, Docker, Expo CLI, etc.).
- Instrucciones para levantar todo el sistema con Docker Compose.
- Instrucciones para ejecutar la app móvil con Expo.
- Credenciales de prueba para operador y ciudadano.
- Enlace al repositorio de GitHub.

### `README.md` por componente

Cada carpeta `backend/`, `mobile/` y `dashboard/` debe tener su propio README con:

- Propósito del componente.
- Variables de entorno requeridas (referenciando `.env.example`).
- Cómo instalar dependencias.
- Cómo ejecutar en desarrollo.
- Cómo ejecutar los tests (solo backend).
- Endpoints disponibles o pantallas disponibles según corresponda.

### `docs/arquitectura.md`

- Diagrama de componentes del sistema.
- Justificación de las decisiones tecnológicas.
- Descripción de la arquitectura de capas del backend.
- Descripción del flujo de alertas completo.
- Justificación de cualquier cambio respecto a las tecnologías base definidas en este archivo.

### `docs/base-de-datos.md`

- Diagrama entidad-relación del esquema de base de datos.
- Descripción de cada tabla y sus campos relevantes.
- Explicación del uso de PostGIS para datos geoespaciales.
- Instrucciones para aplicar migraciones y cargar datos semilla.

### `docs/api-endpoints.md`

- Lista completa de endpoints con método, ruta, descripción, autenticación requerida, body de ejemplo y respuesta de ejemplo.
- Ordenados por módulo.

### `docs/defensa.md`

- Resumen de qué funciona y qué no en el MVP.
- Respuestas preparadas al banco de preguntas completo (ver sección 20).
- Instrucciones para la demostración en vivo: orden de pasos para mostrar el flujo completo desde el reporte ciudadano hasta la alerta en el dashboard.
- Reflexión individual de cada integrante: fortalezas personales, dificultades encontradas y lecciones aprendidas durante el proceso.
- Guía de quién explica qué durante los 15 minutos de defensa.

### `informe-final/` o sección en el informe grupal

El informe grupal entregado al docente debe cubrir obligatoriamente los siguientes tres puntos de la evaluación:

**Punto 1 — Implicancias, proyecciones y expectativas:**
Definir reflexivamente las implicancias de cada alternativa de desarrollo (Alt 1, Alt 2, Alt 3), proyectarlas en el tiempo e indicar las expectativas de cada una según los objetivos de la Municipalidad Valle del Sol. Debe estar alineado con los objetivos institucionales del caso.

**Punto 2 — Técnicas de análisis y justificación de la elección:**
Describir las técnicas utilizadas (Matriz AHP, VAN/TIR/PRI/ROI, análisis de factibilidad técnica y organizacional) y generar argumentos con respaldo técnico que justifiquen la selección de la Alternativa 3 (Integral por Etapas). Los argumentos deben ser concretos, con cifras del caso.

**Punto 3 — Documentación final del proyecto:**
Presentar los datos clave del proceso de forma sintética y persuasiva. Incluir los indicadores financieros (VAN $22,1M CLP, TIR 18,5%, PRI 2,9 años, ROI 38%), el score AHP (0,79), los riesgos identificados y las implicancias para las partes interesadas.

**Descripción técnica del MVP (máximo 1 plana):**
Obligatoria dentro del informe. Debe incluir: tecnologías utilizadas, decisiones de implementación adoptadas, alcance del MVP versus el sistema completo, y el requerimiento principal que demuestra.

---

## 17. Criterios de aceptación del MVP

El MVP se considera completo cuando cumple todos los siguientes criterios:

### Backend

- [ ] API corriendo en puerto 3000 con Docker Compose.
- [ ] Endpoints de autenticación funcionales (register, login, JWT).
- [ ] CRUD completo de reportes ciudadanos con geolocalización.
- [ ] Creación de incidentes desde reportes con cambio de estado.
- [ ] Generación de alerta automática al confirmar un incidente.
- [ ] SMS enviado en modo test de Twilio al crear alerta.
- [ ] Evento Socket.io emitido al dashboard al crear alerta.
- [ ] Endpoints GeoJSON para el módulo `geo` funcionando.
- [ ] Migraciones Prisma aplicadas y datos semilla cargados.
- [ ] Al menos 5 tests unitarios pasando.

### App móvil

- [ ] App ejecutable con `expo start`.
- [ ] Pantalla de login y registro funcionales.
- [ ] Pantalla de nuevo reporte: captura foto, GPS y descripción.
- [ ] Envío de reporte al backend con JWT.
- [ ] Lista de alertas activas consumidas desde el backend.
- [ ] Manejo de permisos de cámara y ubicación.

### Dashboard web

- [ ] Dashboard ejecutable con `npm run dev`.
- [ ] Login de operador funcional.
- [ ] Mapa Leaflet mostrando reportes e incidentes activos.
- [ ] Lista de reportes con opción de confirmar como incidente.
- [ ] Actualización en tiempo real de nuevas alertas por Socket.io.
- [ ] KPIs visibles en pantalla principal.

### Infraestructura y documentación

- [ ] `docker-compose.yml` levanta backend, PostgreSQL y Redis sin errores.
- [ ] `.env.example` completo en backend y dashboard.
- [ ] README principal completo con instrucciones de ejecución.
- [ ] README por componente completo.
- [ ] `docs/arquitectura.md` completo.
- [ ] `docs/api-endpoints.md` completo.
- [ ] `docs/defensa.md` preparado.
- [ ] Repositorio en GitHub con historial de commits coherente.
- [ ] Branching documentado con ramas `feature/` visibles en el historial.

---

## 18. Qué NO debe hacer el agente

- No borrar carpetas completas sin autorización explícita.
- No cambiar la estructura de módulos definida en este archivo.
- No mezclar responsabilidades entre módulos (por ejemplo, no llamar al repository de `incidents` desde el controller de `reports`).
- No poner lógica de negocio en controllers ni en componentes React.
- No retornar objetos Prisma crudos desde los controllers; siempre usar response DTOs.
- No hardcodear URLs, credenciales, tokens ni puertos en el código fuente.
- No subir archivos `.env` con valores reales al repositorio.
- No agregar tecnologías fuera de las definidas en la sección 5 sin justificación.
- No implementar funcionalidades fuera del alcance del MVP definido en la sección 2.
- No complicar el proyecto con Kubernetes, CI/CD avanzado, microservicios adicionales o patrones de producción innecesarios.
- No eliminar tests existentes.
- No dejar código que no compila.
- No dejar endpoints sin autenticación si el caso de uso lo requiere.
- No almacenar datos personales sin el tratamiento definido en la sección 12 (Ley 19.628).
- No reemplazar una solución simple y funcional por una arquitectura más compleja sin beneficio claro para el MVP.
- No introducir dependencias nuevas sin justificar su necesidad en el README del componente.
- No modificar el esquema de base de datos sin generar la migración Prisma correspondiente.
- No dejar `TODO` sin resolver en código que se considera terminado.

---

## 19. Prioridad de trabajo

El orden recomendado de trabajo es el siguiente. Ante dudas, respetar esta prioridad.

1. Docker Compose funcional con PostgreSQL + PostGIS + Redis.
2. Esquema Prisma completo con migraciones y datos semilla.
3. Módulo `users`: registro, login, JWT, middleware de autenticación.
4. Módulo `reports`: CRUD de reportes con geolocalización.
5. Módulo `incidents`: creación desde reporte, cambio de estado.
6. Módulo `alerts`: worker Bull, envío SMS Twilio test, evento Socket.io.
7. Módulo `geo`: endpoints GeoJSON para mapa.
8. Dashboard web: login + mapa + lista de reportes + confirmación de incidente.
9. App móvil: login + nuevo reporte (foto + GPS) + lista de alertas.
10. Integración end-to-end y pruebas del flujo completo.
11. Tests unitarios de services.
12. Documentación completa (`docs/`, READMEs).
13. Preparación de la demostración (`docs/defensa.md`).

Todo agente o desarrollador debe seguir esta prioridad salvo que el equipo indique explícitamente otro objetivo. Ante cualquier ambigüedad, priorizar el criterio de aceptación del MVP antes que optimizaciones o mejoras no requeridas.


---

## 20. Banco de preguntas — Defensa oral

La defensa oral dura 15 minutos por equipo. La calificación es **individual**. El docente distribuirá las preguntas entre los integrantes. Todo el equipo debe estar preparado para responder cualquiera de las siguientes preguntas con precisión técnica.

### Banco de preguntas oficial (GPY1101 Parcial 3)

**Pregunta 1 — Presentación de la alternativa seleccionada**

¿Cuáles son los criterios técnicos aplicados en la decisión de elegir la Alternativa 3 (Integral por Etapas)? ¿Cómo influyeron los estudios de factibilidad y las necesidades de la organización?

Respuesta esperada: mencionar la Matriz AHP (score 0,79), la factibilidad técnica (React Native, Node.js, PostgreSQL/PostGIS), la factibilidad organizacional (resistencia al cambio, 81% de funcionarios con info incompleta), la factibilidad normativa (Ley 19.628, SENAPRED) y las necesidades del caso (35 min de detección, 65% de vecinos sin saber reportar).

**Pregunta 2 — Justificación de la selección y vía de desarrollo**

¿Qué particularidades conlleva la implementación de la Alternativa 3? ¿Qué problemas específicos resuelve la vía de desarrollo propio por licitación?

Respuesta esperada: desarrollo a medida en 3 etapas (8-12 meses), control total del código fuente, integración con sistemas municipales existentes, arquitectura modular que reduce riesgos, licitación por ChileCompra. Problemas que resuelve: retrasos de 35 min, fragmentación de información, baja participación ciudadana (65%), falta de coordinación interinstitucional.

**Pregunta 3 — Resultados del proceso**

¿Cuáles son los datos y cifras relevantes para las partes interesadas? ¿Cómo se da cumplimiento a los requerimientos iniciales?

Respuesta esperada: VAN $22,1M CLP, TIR 18,5% > tasa social 6%, PRI 2,9 años, ROI 38%. Detección 15 min antes reduce 40% la superficie. Score AHP Alternativa 3: 0,79. Requerimientos de la Parcial 1 cubiertos: reporte ciudadano con geolocalización, dashboard operativo, motor de alertas. Stakeholders impactados: Alcalde Joaquín Rivas, Angélica Cisternas, Marcelo Castillo, 40 técnicos, Bomberos/CONAF, ciudadanía.

**Pregunta 4 — Demostración y explicación del MVP**

¿Qué requerimiento resuelve el MVP? ¿Qué decisiones técnicas se tomaron y por qué? ¿Cuáles son sus limitaciones actuales frente al sistema completo?

Respuesta esperada: el MVP demuestra el requerimiento principal (reporte ciudadano con foto + GPS → incidente → alerta SMS simulada → dashboard en tiempo real). Decisiones técnicas: Node.js por ecosistema JavaScript compartido con el frontend, PostgreSQL + PostGIS para datos geoespaciales, Bull + Redis para alertas asíncronas sin bloquear la API, Socket.io para tiempo real. Limitaciones: SMS en modo test (no producción), APIs de Bomberos/CONAF simuladas con stubs, sin ML predictivo, sin tracking de brigadas.

**Pregunta 5 — Reflexión individual**

¿Cuál fue tu aporte individual al trabajo realizado? ¿Cuáles son tus fortalezas, dificultades y lecciones aprendidas en esta etapa?

Respuesta esperada: cada integrante debe tener claro su contribución específica (qué módulo desarrolló, qué sección del informe redactó, qué decisiones tomó). Fortalezas y dificultades reales y honesta. Lecciones aprendidas vinculadas al proceso de evaluación de proyectos de software.

### Reglas obligatorias de preparación para la defensa

- Todo el equipo debe conocer los números financieros de memoria: VAN, TIR, PRI, ROI, score AHP, tasa de descuento.
- Todo el equipo debe poder explicar la arquitectura de capas del backend (presentation / application / domain / infrastructure).
- Todo el equipo debe poder demostrar el MVP en vivo: el flujo completo desde el reporte ciudadano hasta la alerta en el dashboard.
- Todo el equipo debe conocer los riesgos identificados y sus estrategias de mitigación.
- Todo el equipo debe poder explicar por qué se descartaron las Alternativas 1 y 2.
- Cada integrante debe tener preparada su reflexión individual (Pregunta 5) de forma auténtica.

---

## 21. Rúbrica de evaluación — Parcial N°3

La calificación de la Parcial 3 se realiza según los siguientes niveles de logro:

| Nivel | % logro | Descripción |
|---|---|---|
| Muy buen desempeño | 100% | Logro de todos los aspectos del indicador sin omisiones. |
| Buen desempeño | 80% | Alto desempeño con pequeñas omisiones o errores menores. |
| Desempeño aceptable | 60% | Logro de los elementos básicos con omisiones o errores notables. |
| Desempeño incipiente | 30% | Omisiones o errores que no permiten evidenciar el logro básico. |
| Desempeño no logrado | 0% | Ausencia o incorrecto desempeño del indicador. |

### Indicadores de evaluación

#### Dimensión: Informe (20% de la Parcial)

**Indicador 1 — Define implicancias, proyecciones y expectativas**

| Nivel | Criterio |
|---|---|
| 100% | Define con precisión y detalle las implicancias, proyecciones y expectativas de las opciones de desarrollo, de forma reflexiva y alineada con los objetivos de la organización. |
| 80% | Define claramente con reflexión adecuada y alineación a los objetivos, con mínimas omisiones. |
| 60% | Define de manera aceptable con algunas dificultades en la reflexión y alineación con los objetivos. |
| 30% | Define con errores y omisiones, mostrando varias dificultades en la reflexión y alineación. |
| 0% | No define las implicancias, proyecciones ni expectativas de las opciones de desarrollo. |

Lo que implica para el informe: el equipo debe proyectar en el tiempo las tres alternativas (Alt 1: 3-4 meses, cobertura parcial; Alt 2: 4-5 meses, sin participación ciudadana; Alt 3: 8-12 meses, ecosistema completo) e indicar las expectativas de cada una según la misión institucional de la Municipalidad Valle del Sol.

**Indicador 2 — Describe técnicas de análisis y justifica la elección**

| Nivel | Criterio |
|---|---|
| 100% | Describe detalladamente las técnicas utilizadas, justificando claramente la elección con argumentos sólidos y fundamentados. |
| 80% | Describe claramente las técnicas con argumentos bien fundamentados y mínimos errores. |
| 60% | Describe de manera aceptable con algunos errores o falta de profundidad en los argumentos. |
| 30% | Describe superficialmente con argumentos insuficientes o poco claros. |
| 0% | No describe las técnicas ni justifica la elección de la alternativa. |

Lo que implica para el informe: nombrar y explicar cada técnica usada (Matriz AHP con criterios y ponderaciones, VAN/TIR/PRI/ROI con fórmulas y valores, análisis de factibilidad técnica/organizacional/normativa/económica) y articular por qué la Alt 3 gana en cada una.

**Indicador 3 — Presenta documentación final del proyecto**

| Nivel | Criterio |
|---|---|
| 100% | Presenta de manera completa la documentación final, comunicando persuasivamente a las partes interesadas con datos y cifras clave sin errores. |
| 80% | Presenta la documentación comunicando persuasivamente con datos y cifras clave, con mínimos errores. |
| 60% | Presenta de forma aceptable con datos y cifras clave pero con algunos errores. |
| 30% | Presenta de forma insuficiente con errores y omisiones al destacar datos y cifras. |
| 0% | No presenta la documentación final del proyecto. |

Lo que implica para el informe: incluir todos los documentos del proceso (análisis de alternativas Eva2, evaluación económica con flujo de caja en CLP, matriz AHP, análisis de riesgos, implicancias por stakeholder) en un formato sintético y profesional.

#### Dimensión: MVP Funcional (10% de la Parcial)

**Indicador 4 — Desarrolla y presenta un MVP funcional**

| Nivel | Criterio |
|---|---|
| 100% | MVP completamente funcional que resuelve el requerimiento principal con calidad técnica, demostrando dominio de las herramientas y justificando las decisiones de implementación con precisión. |
| 80% | MVP funcional que resuelve el requerimiento principal con mínimas fallas técnicas o de presentación. |
| 60% | MVP parcialmente funcional que resuelve algunos requerimientos con errores técnicos menores que no comprometen la viabilidad de la propuesta. |
| 30% | MVP con importantes fallas técnicas o funcionales que dificultan demostrar la viabilidad de la alternativa seleccionada. |
| 0% | No presenta un MVP funcional del proyecto. |

Lo que implica para el MVP: el flujo mínimo demostrable es citizen login → nuevo reporte con foto y GPS → operador ve el reporte en el dashboard → operador confirma como incidente → alerta generada automáticamente. Este flujo completo debe funcionar en vivo durante la defensa.

#### Dimensión: Presentación y Defensa Oral (70% de la Parcial)

**Indicador 5 — Resume la opción de desarrollo respondiendo con precisión técnica**

| Nivel | Criterio |
|---|---|
| 100% | Resume de manera atractiva y detallada la opción de desarrollo, respondiendo con precisión técnica todas las preguntas del docente. |
| 80% | Resume claramente respondiendo con precisión técnica con mínimos errores. |
| 60% | Resume de forma aceptable respondiendo con algunos errores técnicos. |
| 30% | Resume con varios errores respondiendo con dificultades técnicas. |
| 0% | No resume la opción de desarrollo ni responde adecuadamente las preguntas. |

**Indicador 6 — Justifica la selección del proyecto y vía de desarrollo**

| Nivel | Criterio |
|---|---|
| 100% | Justifica detalladamente la selección y vía de desarrollo, respondiendo con precisión técnica y sin errores todas las preguntas. |
| 80% | Justifica claramente respondiendo con precisión técnica con mínimos errores. |
| 60% | Justifica de manera aceptable respondiendo con algunos errores. |
| 30% | Justifica superficialmente respondiendo con dificultades. |
| 0% | No justifica la selección ni responde las preguntas del docente. |

**Indicador 7 — Explica los resultados del proceso clara y persuasivamente**

| Nivel | Criterio |
|---|---|
| 100% | Explica los resultados de manera clara y persuasiva, cumpliendo todos los requerimientos iniciales y respondiendo con precisión técnica. |
| 80% | Explica de forma clara y persuasiva, cumpliendo la mayoría de requerimientos con mínimos errores. |
| 60% | Explica de manera aceptable, cumpliendo parcialmente los requerimientos con algunos errores técnicos. |
| 30% | Explica con poca claridad, cumpliendo insuficientemente los requerimientos. |
| 0% | No explica los resultados del proceso ni responde las preguntas del docente. |

**Indicador 8 — Reflexión individual sobre el aporte propio**

| Nivel | Criterio |
|---|---|
| 100% | Explica de forma reflexiva y con detalle su aporte individual, indicando fortalezas, dificultades y lecciones aprendidas. |
| 80% | Explica reflexivamente su aporte con mínimas omisiones o errores. |
| 60% | Explica de forma aceptable su aporte con algunas omisiones. |
| 30% | Explica de forma insuficiente con dificultades para articular fortalezas o lecciones. |
| 0% | No explica su aporte individual ni indica fortalezas, dificultades o lecciones aprendidas. |

### Checklist de la rúbrica — Lo que el agente debe garantizar

El agente debe asegurar que, al terminar el trabajo, el equipo pueda demostrar todos los siguientes puntos:

- [ ] **Indicador 1**: El informe proyecta en el tiempo las tres alternativas con expectativas alineadas a la misión de la Municipalidad Valle del Sol.
- [ ] **Indicador 2**: El informe documenta todas las técnicas usadas (AHP, VAN/TIR/PRI/ROI, factibilidades) con argumentos técnicos concretos y cifras del caso.
- [ ] **Indicador 3**: La documentación final es completa, sintética y persuasiva para las partes interesadas definidas en el caso.
- [ ] **Indicador 4**: El MVP funciona en vivo: flujo completo reporte → incidente → alerta demostrable sin errores críticos durante la defensa.
- [ ] **Indicador 5**: Cualquier integrante puede resumir la alternativa seleccionada y sus criterios técnicos sin leer las diapositivas.
- [ ] **Indicador 6**: Cualquier integrante puede justificar por qué se eligió la Alt 3 y no las Alt 1 o 2, con argumentos técnicos y cifras.
- [ ] **Indicador 7**: Cualquier integrante puede explicar VAN, TIR, PRI, ROI, score AHP, riesgos y partes interesadas sin ayuda.
- [ ] **Indicador 8**: Cada integrante tiene preparada su reflexión individual auténtica y específica.
