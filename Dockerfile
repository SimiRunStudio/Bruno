FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json server.js index.html ./
COPY assets ./assets
COPY README* ./*.txt ./
EXPOSE 3000
CMD ["node", "server.js"]
