FROM alpine:3.14

ENV DEBIAN_FRONTEND noninteractive

RUN apk update && apk add bash
RUN apk add npm
RUN apk add git
RUN apk add curl

RUN npm cache clean -f
RUN npm install -g --silent n
RUN n 17.7.2

RUN git clone https://github.com/aSehat/SoftDev-Group3

RUN npm install npm@8.5.2 --silent -g
RUN cd /SoftDev-Group3/Application && npm install node@17.7.2 --silent && npm install --silent

RUN cd /SoftDev-Group3/Application/client && npm install --silent

WORKDIR "/SoftDev-Group3/Application"

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "run", "dev"]
