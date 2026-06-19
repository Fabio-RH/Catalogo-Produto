# Imagem base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia schema do Prisma
COPY prisma ./prisma

# Gera o Prisma Client
RUN npx prisma generate

# Copia o restante do projeto
COPY . .

# Compila o NestJS
RUN npm run build

# Porta da API
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/main.js"]