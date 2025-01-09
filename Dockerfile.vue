# Imagen base
FROM node:22-alpine

# Establece directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json tsconfig.json vite.config.ts ./

# Instala las dependencias
RUN npm install

# # Copia el resto del código fuente
# COPY . .

# Expone el puerto
EXPOSE 3001

# # Comando para iniciar la aplicación
# CMD ["npm", "run", "dev"]

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
