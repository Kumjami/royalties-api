FROM node:lts-alpine

WORKDIR /home/node
COPY ./ .

RUN npm cit

USER node

CMD ["npm", "start"]