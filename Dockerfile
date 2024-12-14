FROM node:18
WORKDIR /app

COPY package*.json ./
RUN apt update && apt install -y build-essential python3 libtool autoconf automake

RUN rm -rf node_modules package-lock.json

RUN npm install
RUN npm rebuild argon2

COPY . .


RUN npx prisma generate

RUN npm run build


EXPOSE 3333

CMD ["npm", "run", "start:prod"]
