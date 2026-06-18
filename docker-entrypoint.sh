#!/bin/sh
set -e

echo "🔧 Esperando conexión estable con PostgreSQL..."
sleep 3

echo "📦 Aplicando migraciones de Prisma..."
npx prisma migrate deploy

echo "🌱 Cargando datos semilla (se omite si ya existen)..."
npm run prisma:seed || echo "⚠️  Seed ya aplicado anteriormente, continuando..."

echo "✅ Iniciando servidor SCAT-GI..."
npm run dev
