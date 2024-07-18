#Dockerfile
FROM node:20.15.0
WORKDIR /app
COPY package.json .
COPY . .
#COPY vite.config.ts /app/
RUN npm install -g vite
#RUN npm install -g typescript
RUN npm install
RUN apt-get update && apt-get install -y xdg-utils
RUN npm list vite
COPY . .
#HEALTHCHECK CMD curl --fail http://localhost:3300/_stcore/health
CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
 