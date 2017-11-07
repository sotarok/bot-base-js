FROM node:8-alpine

WORKDIR /src/
COPY package.json package-lock.json /src/

RUN cd /src; npm install --production

COPY index.js /src/
CMD ["node", "index.js"]
