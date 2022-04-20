# Dockerfile for React client

# Build react client
FROM node:17.7.2-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install
RUN npm install react-schedule-meeting --force

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]