# Chipsparadise
Dies ist der Source Code von den Slotmachines des Casinos Chipsparadise aus dem Schule als Staat Projekt DRE / Demokratische Republik Einstein.

## Benötigte Werkzeuge
### Server
 - Supabase Datenbank:
   - uname: String
   - amount: Float8
 - Server: NodeJS + Package Manager (NPM Packete)
### Client
 - Web Server: Caddy (Empfehlung)

## Installation
### Server (Ordner api)
#### .env Konfiguration
```
SUPABASE_URL=https://deineDatenbank.supabase.co
SUPABASE_KEY=DeinAdminToken
```

#### Dockerfile
```dockerfile
FROM node:lts

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm i
COPY --chown=node:node . .
EXPOSE 8080

CMD [ "npm", "start" ]
```

### Client
#### Einrichtung
1. Installation der benötigten Bibliotheken (`npm i` / `yarn` / `pnpm i`)
2. Variable `apiHost` in `App.vue`, `components/Login.vue` und `components/Roll.vue` zu eigenem Server ändern
3. Webseite bauen: `npm run build` / `yarn build` / `pnpm run build`

### Docker Compose
```yml
services:
  api:
    build: ./web/
    restart: unless-stopped
    networks:
      - api
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./web/dist:/var/www/
    networks:
      - api
      - web

networks:
    web:
        external: true
    api:
        external: false
        driver: bridge
```