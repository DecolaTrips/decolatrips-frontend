FROM node:22.17.1-slim

# Instalar dependências globais
RUN npm install -g @angular/cli@20.1.1

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de configuração
COPY package.json package-lock.json ./
COPY angular.json tsconfig.json tsconfig.app.json .postcssrc.json .editorconfig ./


# Instalar dependências
RUN npm install

# Expor porta para o servidor de desenvolvimento
EXPOSE 4200

# Comando para iniciar o servidor de desenvolvimento com acesso de rede
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]