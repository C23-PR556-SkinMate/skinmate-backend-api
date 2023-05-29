# Build dependencies
FROM node:16-alpine3.16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 

# Build image
ENV NODE_ENV=production
EXPOSE 3000
CMD npm run start
