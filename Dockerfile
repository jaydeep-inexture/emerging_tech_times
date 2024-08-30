#Dockerfile
FROM node:20.15.0
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN apt-get update && apt-get install -y xdg-utils
RUN npm list vite
COPY . .
CMD ["npm", "run", "dev"]
CMD ["npm", "start"]