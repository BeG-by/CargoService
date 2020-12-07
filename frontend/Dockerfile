FROM node:15.3.0-alpine3.10
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "run-script", "start-docker"]