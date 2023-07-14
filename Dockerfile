FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN yarn install --check-files
COPY . .
EXPOSE 5000
CMD ["yarn", "dev:docker"]
