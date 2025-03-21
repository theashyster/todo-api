FROM node
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build
CMD [ "npm", "run", "serve" ]
