import { PrismaClient, UserRole, ReportStatus, IncidentSeverity, IncidentStatus, AlertChannel, AlertStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // ============================================================================
  // 1. CREATE USERS (2 operators + 5 citizens)
  // ============================================================================
  console.log("📝 Creating users...");

  const operatorPassword = await hashPassword("operator123");
  const citizenPassword = await hashPassword("citizen123");

  // Operators
  const operator1 = await prisma.user.create({
    data: {
      name: "Angélica Cisternas",
      email: "angelica.cisternas@valledelsol.cl",
      phone: "+56912345678",
      password: operatorPassword,
      role: UserRole.OPERATOR,
    },
  });

  const operator2 = await prisma.user.create({
    data: {
      name: "Marcelo Castillo",
      email: "marcelo.castillo@valledelsol.cl",
      phone: "+56912345679",
      password: operatorPassword,
      role: UserRole.OPERATOR,
    },
  });

  // Citizens
  const citizen1 = await prisma.user.create({
    data: {
      name: "Juan López",
      email: "juan.lopez@gmail.com",
      phone: "+56987654321",
      password: citizenPassword,
      role: UserRole.CITIZEN,
    },
  });

  const citizen2 = await prisma.user.create({
    data: {
      name: "María González",
      email: "maria.gonzalez@gmail.com",
      phone: "+56987654322",
      password: citizenPassword,
      role: UserRole.CITIZEN,
    },
  });

  const citizen3 = await prisma.user.create({
    data: {
      name: "Carlos Reyes",
      email: "carlos.reyes@gmail.com",
      phone: "+56987654323",
      password: citizenPassword,
      role: UserRole.CITIZEN,
    },
  });

  const citizen4 = await prisma.user.create({
    data: {
      name: "Sofia Muñoz",
      email: "sofia.munoz@gmail.com",
      phone: "+56987654324",
      password: citizenPassword,
      role: UserRole.CITIZEN,
    },
  });

  const citizen5 = await prisma.user.create({
    data: {
      name: "Roberto Silva",
      email: "roberto.silva@gmail.com",
      phone: "+56987654325",
      password: citizenPassword,
      role: UserRole.CITIZEN,
    },
  });

  console.log(`✅ Created 2 operators and 5 citizens`);

  // ============================================================================
  // 2. CREATE REPORTS (4 example reports from citizens)
  // ============================================================================
  console.log("📋 Creating reports...");

  const report1 = await prisma.report.create({
    data: {
      citizenId: citizen1.id,
      description: "Foco de incendio detectado en ladera norte, cerca del bosque de pinos",
      photoUrl: "https://example.com/photos/fire1.jpg",
      latitude: -33.4569,
      longitude: -70.6671,
      status: ReportStatus.PENDING,
    },
  });

  const report2 = await prisma.report.create({
    data: {
      citizenId: citizen2.id,
      description: "Columna de humo visible desde el cerro Las Vertientes",
      photoUrl: "https://example.com/photos/fire2.jpg",
      latitude: -33.4512,
      longitude: -70.6712,
      status: ReportStatus.REVIEWED,
    },
  });

  const report3 = await prisma.report.create({
    data: {
      citizenId: citizen3.id,
      description: "Llamas pequeñas en zona de matorrales, viento del sur",
      latitude: -33.4634,
      longitude: -70.6589,
      status: ReportStatus.PENDING,
    },
  });

  const report4 = await prisma.report.create({
    data: {
      citizenId: citizen4.id,
      description: "Incendio activo en sector de alta vegetación",
      photoUrl: "https://example.com/photos/fire4.jpg",
      latitude: -33.4598,
      longitude: -70.6645,
      status: ReportStatus.REVIEWED,
    },
  });

  console.log(`✅ Created 4 example reports`);

  // ============================================================================
  // 3. CREATE INCIDENTS (2 confirmed incidents from reports)
  // ============================================================================
  console.log("🚨 Creating incidents...");

  const incident1 = await prisma.incident.create({
    data: {
      reportId: report1.id,
      operatorId: operator1.id,
      name: "Incendio Forestal Ladera Norte",
      description: "Incidente confirmado en ladera norte, sector bosque de pinos. Evacuación en proceso.",
      severity: IncidentSeverity.HIGH,
      status: IncidentStatus.ACTIVE,
      latitude: report1.latitude,
      longitude: report1.longitude,
    },
  });

  const incident2 = await prisma.incident.create({
    data: {
      reportId: report4.id,
      operatorId: operator2.id,
      name: "Incendio Vegetal Sector Matorrales",
      description: "Incidente confirmado en zona de matorrales. Brigadas en despliegue.",
      severity: IncidentSeverity.CRITICAL,
      status: IncidentStatus.ACTIVE,
      latitude: report4.latitude,
      longitude: report4.longitude,
    },
  });

  console.log(`✅ Created 2 confirmed incidents`);

  // ============================================================================
  // 4. CREATE ALERTS FOR INCIDENTS
  // ============================================================================
  console.log("🔔 Creating alerts...");

  const alert1 = await prisma.alert.create({
    data: {
      incidentId: incident1.id,
      message: "ALERTA: Incendio Forestal en Ladera Norte. Severidad: ALTA. Coordenadas: -33.4569, -70.6671. Se activa protocolo de evacuación.",
      channel: AlertChannel.SMS,
      status: AlertStatus.SENT,
      sentAt: new Date(),
    },
  });

  const alert2 = await prisma.alert.create({
    data: {
      incidentId: incident2.id,
      message: "ALERTA CRÍTICA: Incendio Vegetal en Sector Matorrales. Severidad: CRÍTICA. Coordenadas: -33.4598, -70.6645. Evacuación inmediata ordenada.",
      channel: AlertChannel.SMS,
      status: AlertStatus.SENT,
      sentAt: new Date(),
    },
  });

  console.log(`✅ Created 2 alerts`);

  // ============================================================================
  // 5. CREATE NOTIFICATIONS FOR ALERTS
  // ============================================================================
  console.log("📲 Creating notifications...");

  await prisma.notification.create({
    data: {
      alertId: alert1.id,
      userId: citizen1.id,
      deliveredAt: new Date(),
    },
  });

  await prisma.notification.create({
    data: {
      alertId: alert1.id,
      userId: citizen2.id,
      deliveredAt: new Date(),
    },
  });

  await prisma.notification.create({
    data: {
      alertId: alert2.id,
      userId: citizen3.id,
      deliveredAt: new Date(),
    },
  });

  await prisma.notification.create({
    data: {
      alertId: alert2.id,
      userId: citizen4.id,
      deliveredAt: new Date(),
    },
  });

  console.log(`✅ Created 4 notifications`);

  // ============================================================================
  // 6. CREATE RISK ZONES (3 predefined areas)
  // ============================================================================
  console.log("🗺️  Creating risk zones...");

  const riskZone1 = await prisma.riskZone.create({
    data: {
      name: "Bosque Nororiental",
      description: "Zona de alto riesgo con predominancia de bosque nativo y pinos. Alto valor ecológico.",
      riskLevel: 5,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-70.6600, -33.4500],
            [-70.6700, -33.4500],
            [-70.6700, -33.4600],
            [-70.6600, -33.4600],
            [-70.6600, -33.4500],
          ],
        ],
      },
    },
  });

  const riskZone2 = await prisma.riskZone.create({
    data: {
      name: "Sector Matorrales Centro",
      description: "Zona de riesgo medio con vegetación de matorral denso. Acceso limitado para brigadas.",
      riskLevel: 4,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-70.6620, -33.4580],
            [-70.6720, -33.4580],
            [-70.6720, -33.4680],
            [-70.6620, -33.4680],
            [-70.6620, -33.4580],
          ],
        ],
      },
    },
  });

  const riskZone3 = await prisma.riskZone.create({
    data: {
      name: "Zona Rural Periférica",
      description: "Zona de riesgo bajo con infraestructura rural dispersa. Vías de acceso desarrolladas.",
      riskLevel: 2,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-70.6700, -33.4400],
            [-70.6800, -33.4400],
            [-70.6800, -33.4500],
            [-70.6700, -33.4500],
            [-70.6700, -33.4400],
          ],
        ],
      },
    },
  });

  console.log(`✅ Created 3 risk zones`);

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
  console.log("=".repeat(60));
  console.log("\n📊 Summary:");
  console.log("  • Users: 2 operators + 5 citizens");
  console.log("  • Reports: 4 citizen reports");
  console.log("  • Incidents: 2 confirmed incidents");
  console.log("  • Alerts: 2 SMS alerts");
  console.log("  • Notifications: 4 delivered");
  console.log("  • Risk Zones: 3 predefined areas\n");

  console.log("🔑 Test Credentials:");
  console.log(`  Operator: angelica.cisternas@valledelsol.cl / operator123`);
  console.log(`  Operator: marcelo.castillo@valledelsol.cl / operator123`);
  console.log(`  Citizen: juan.lopez@gmail.com / citizen123`);
  console.log(`  Citizen: maria.gonzalez@gmail.com / citizen123\n`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
