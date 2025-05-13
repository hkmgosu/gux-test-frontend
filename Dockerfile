# Usa la imagen oficial de Node.js 24
FROM node:24-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package.json package-lock.json* ./

# Instala dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que corre tu app (ajusta si es necesario)
EXPOSE 3000

# Comando para correr la app en modo producción
CMD ["npm", "start"]
