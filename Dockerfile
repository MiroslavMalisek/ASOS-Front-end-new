FROM node:20-alpine
WORKDIR /asos_fe
COPY package.json ./
COPY .. /asos_fe
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "dev"]