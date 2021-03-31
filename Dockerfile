FROM node:14

LABEL version="1.0"
LABEL maintainer="andryushque"
LABEL build_date="31.03.2021"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1234

CMD ["npm", "run", "start"]