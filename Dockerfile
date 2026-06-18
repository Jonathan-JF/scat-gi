FROM node:20-alpine

WORKDIR /app

# OpenSSL es requerido por Prisma en Alpine
RUN apk add --no-cache openssl

# Instalar dependencias primero (mejor cacheo de capas)
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Generar el cliente de Prisma dentro de la imagen
RUN npx prisma generate

# Dar permisos de ejecución al script de arranque
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
