FROM node:16-alpine AS BASEIMAGE

WORKDIR /pa-backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prebuild && npm run build && npm prune --production

FROM node:16-alpine

WORKDIR /pa-backend
COPY --from=BASEIMAGE /pa-backend/dist /pa-backend/dist
COPY --from=BASEIMAGE /pa-backend/node_modules /pa-backend/node_modules
EXPOSE 3000

CMD ["node", "dist/main.js"]

# docker build -t pepper-attack/pa-backend .
# docker run --name pa-backend -d -p 8000:3000 pepper-attack/pa-backend
# http http://localhost:8000/xxx
