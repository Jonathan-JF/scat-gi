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
| Docker (Postgres + Redis + Backend + Dashboard) | ✅ Funcionando con un solo comando |
| Backend API (Node.js) | ✅ Funcionando en puerto 3000 |
| Base de datos + migraciones | ✅ Se aplican automáticamente al iniciar |
| Datos semilla | ✅ Se cargan automáticamente al iniciar |
| Módulo users (auth + JWT) | ✅ Completo |
| Módulo reports | ✅ Completo |
| Módulo incidents | ✅ Completo |
| Módulo alerts (Bull + Twilio) | ✅ Completo |
| Módulo geo (GeoJSON) | ✅ Completo |
| Dashboard web | ✅ Funcionando en puerto 8080 |
| App móvil | 🔄 Pendiente |

---

## Flujo demostrable (defensa oral)

```
1. Operador hace login en el dashboard (localhost:8080)
2. Ciudadano envía reporte con foto y GPS
3. Operador ve el reporte en el mapa
4. Operador confirma el reporte como incidente
5. Sistema genera alerta SMS automáticamente (Twilio test)
6. Alerta aparece en el dashboard en tiempo real (Socket.io)
```

---

## Requisitos previos

- **Docker Desktop** (único requisito real)
- Git
- Navegador web moderno (Chrome recomendado)

> No necesitas instalar Node.js, PostgreSQL ni Redis en tu máquina. Todo corre dentro de Docker.

---

## Cómo levantar el sistema completo

### 1 — Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/scat-gi.git
cd scat-gi
```

### 2 — Configurar variables de entorno

```bash
cp .env.example .env
```

### 3 — Abrir Docker Desktop

Espera a que el ícono de la ballena 🐳 quede estático antes de continuar.

### 4 — Levantar todo el sistema con un solo comando

```bash
docker-compose up -d --build
```

Este comando automáticamente:

- Levanta PostgreSQL 15 con PostGIS habilitado
- Levanta Redis 7
- Construye la imagen del backend
- Aplica las migraciones de Prisma
- Carga los datos semilla (si no existen)
- Inicia el servidor Express en el puerto 3000
- Sirve el dashboard en Nginx en el puerto 8080

La primera vez tarda 2-3 minutos en construir la imagen del backend. Las siguientes veces es casi instantáneo.

### 5 — Verificar que los 4 contenedores estén arriba

```bash
docker-compose ps
```

Debes ver `scat-gi-postgres`, `scat-gi-redis`, `scat-gi-backend` y `scat-gi-dashboard`, todos en estado `Up`.

### 6 — Abrir el dashboard

```
http://localhost:8080
```

Las credenciales de operador ya están precargadas en el formulario de login.

---

## Comandos útiles de Docker

```bash
# Ver logs del backend en vivo
docker-compose logs -f backend

# Reiniciar solo el backend tras un cambio de código
docker-compose up -d --build backend

# Detener todo sin borrar datos
docker-compose down

# Detener todo y borrar la base de datos (reinicio limpio)
docker-compose down -v

# Ver estado de los 4 servicios
docker-compose ps
```

---

## Modo desarrollo (opcional, sin Docker para el backend)

Si prefieres trabajar con hot-reload sin reconstruir la imagen cada vez:

```bash
# Deja solo Postgres y Redis en Docker
docker-compose up -d postgres redis

# Corre el backend localmente
npm install
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

En este modo, abre el dashboard directamente como archivo (`dashboard/index.html`) en lugar de `localhost:8080`.

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
│   ├── jobs/                # Worker de alertas Bull
│   ├── config/
│   │   ├── cors.config.ts  # Orígenes permitidos (incluye :8080)
│   │   ├── socket.config.ts
│   │   └── ...
│   └── shared/               # Logger, errores base, Prisma
├── prisma/
│   ├── schema.prisma         # Esquema completo (6 entidades)
│   ├── migrations/           # Migración inicial aplicada
│   └── seed.ts                # 7 usuarios, 4 reportes, 3 zonas de riesgo
├── dashboard/
│   └── index.html             # Dashboard operativo (sin dependencias)
├── docs/
│   ├── arquitectura.md
│   ├── base-de-datos.md
│   └── defensa.md
├── docker-compose.yml         # Postgres + Redis + Backend + Dashboard (Nginx)
├── Dockerfile                  # Imagen del backend
├── docker-entrypoint.sh       # Migraciones + seed + arranque automático
├── .dockerignore
├── .env.example
├── AGENTS.md                   # Guía obligatoria del proyecto
└── README.md
```

---

## Arquitectura de capas del backend

Cada módulo sigue la misma estructura de capas:

```
módulo/
├── presentation/    → rutas Express + controllers + DTOs (Zod)
├── application/      → service con lógica de negocio
├── domain/            → tipos, enums y errores del negocio
└── infrastructure/   → repository Prisma + clientes externos
```

El backend es un **monolito modular**. Un solo proceso Node.js con 5 módulos independientes. No usa microservicios.

---

## Arquitectura de despliegue (Docker)

```
┌─────────────────────────────────────────────┐
│              docker-compose up -d --build     │
└─────────────────────────────────────────────┘
         │              │              │            │
         ▼              ▼              ▼            ▼
   ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌────────────┐
   │ postgres │  │   redis   │  │ backend  │  │  dashboard  │
   │  :5432   │  │   :6379   │  │  :3000   │  │   :8080     │
   │ +PostGIS │  │           │  │  Node.js │  │   Nginx     │
   └──────────┘  └───────────┘  └────┬─────┘  └──────┬──────┘
                                       │                │
                                       └──── API ───────┘
```

El backend espera a que Postgres esté `healthy` antes de iniciar, aplica migraciones, carga el seed (si no existe) y recién entonces levanta el servidor Express. El dashboard es un sitio estático servido por Nginx que consume la API del backend.

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
| Nginx (Alpine) | — | Servidor estático del dashboard |
| Docker + Docker Compose | — | Orquestación de los 4 servicios |

---
## Seguridad y privacidad

- JWT con expiración máxima de 24 horas
- Contraseñas cifradas con bcrypt (salt rounds: 10)
- Rate limiting en endpoints de autenticación
- CORS configurado en `src/config/cors.config.ts`, incluyendo el origen del dashboard (`localhost:8080`)
- Solo se almacenan coordenadas del foco reportado, no ubicación domiciliaria del ciudadano
- Cumplimiento **Ley 19.628** de protección de datos personales (Chile)

---
## Solución de problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `failed to connect to the docker API` | Docker Desktop no está corriendo | Abre Docker Desktop y espera el ícono estático |
| Postgres en estado `Restarting` | Volumen corrupto de un intento anterior | `docker-compose down -v` y volver a levantar |
| Error de CORS en consola del navegador | Origen no está en `cors.config.ts` | Agregar el origen a `allowedOrigins` y reconstruir backend |
| `docker-compose ps` muestra tabla vacía | Falta ejecutar `up -d` | `docker-compose up -d --build` |
| Cambios en el código no se reflejan | Imagen Docker no se reconstruyó | `docker-compose up -d --build backend` |
