FROM node:16-alpine AS BASE_IMAGE

WORKDIR /gitops-101
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prebuild && npm run build && npm prune --production

FROM node:16-alpine

WORKDIR /gitops-101
COPY --from=BASE_IMAGE /gitops-101/dist /gitops-101/dist
COPY --from=BASE_IMAGE /gitops-101/node_modules /gitops-101/node_modules
EXPOSE 3000

CMD ["node", "dist/main.js"]

# docker build -t pepper-attack/gitops-101 .
# docker run --name gitops-101 -d -p 8000:3000 pepper-attack/gitops-101
# http http://localhost:8000/xxx
