FROM node:alpine3.17
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN tsc -w 
CMD ["nodemon","app.js"]
EXPOSE 4000