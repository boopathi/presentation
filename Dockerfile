FROM node:0.12.0
MAINTAINER Boopathi Rajaa <me@boopathi.in>

RUN mkdir /presentation

WORKDIR /presentation

ENV PORT 4242

ADD . /presentation/

RUN npm install

VOLUME ['/presentation/db']

EXPOSE 4242

ENTRYPOINT npm start
