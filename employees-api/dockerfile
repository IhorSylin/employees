FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV ENVIRONMENT=production
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=password
ENV DB_DATABASE=posts

CMD [ "npm", "start"]