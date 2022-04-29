FROM node:12-alpine
WORKDIR /usr/arc/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]
