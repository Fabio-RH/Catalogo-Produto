# Indicar a Imagem e qual versão do Node que vou usar
FROM node:20-alpine

#2: Diretório de trabalho dentro do Container
WORKDIR /app

#3: Criar os arquivos de dependencia
COPY package.json .

#4 Instala as dependencias
RUN npm install

#5 Copiar o restante do codigo
COPY . .

#6 iNFORMAR AO DOCKER QUAL PORTA A APLICAÇÃO USARÁ
EXPOSE 3000

#7 COMANDO PARA SER EXECUTADO QUANDO O CONTAINER INICIAR
CMD ['node', "nest start"]