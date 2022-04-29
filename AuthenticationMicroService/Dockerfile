FROM node:12-alpine
WORKDIR /usr/arc/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "app.js"]
