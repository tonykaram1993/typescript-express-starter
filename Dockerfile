FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN yarn install --check-files --force
RUN yarn add -D @swc/cli @swc/core --check-files
COPY . .
EXPOSE 5000
CMD ["yarn", "dev:docker"]
