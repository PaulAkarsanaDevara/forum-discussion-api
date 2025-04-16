FROM node:20-alpine

# Set workdir
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build 
RUN npm run build

CMD ["npm", "run", "start:prod"]
