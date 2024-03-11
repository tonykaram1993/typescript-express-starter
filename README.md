# ExpressJs + TypeScript Backend starter repo

## Features

1. Typescript (https://www.typescriptlang.org)
1. Express (https://expressjs.com)
1. MongoDB (https://www.mongodb.com)
1. Zod Validation (https://zod.dev)
1. Eslint (https://eslint.org)
1. Prettier (https://prettier.io)
1. Winston logger (https://github.com/winstonjs/winston)
1. Github Actions (https://github.com/features/actions)
1. PM2 (https://pm2.keymetrics.io)
1. Jest (https://jestjs.io)
1. Swagger (https://swagger.io)
1. Morgan (https://github.com/expressjs/morgan#readme)
1. Helmet (https://helmetjs.github.io)
1. Rate limiter (https://github.com/express-rate-limit/express-rate-limit)
1. Axios time of flight
1. Docker (https://www.docker.com)
1. Source map support (https://www.npmjs.com/package/source-map-support)
1. Authentication (separate branch)
1. Husky (https://www.npmjs.com/package/husky)

## Abandoned Features

1. SWC (https://swc.rs)
   Currently, SWC does not work well with Docker and is causing many issues, could revisit this at a later date. Plus this should be replaced by Bun.

## TODO

1. Use Bun runtime
1. Add integration testing
1. API versioning
1. MySQL

## How to install

#### Without Docker

1. Clone repo `git clone git@github.com:tonykaram1993/typescript-express-starter.git`
2. `yarn install` - if you wish to use npm or pnpm, you must edit .github/workflows/main.yml to not use `yarn`
3. Copy `.env.example` to `.env.development` - `cp .env.example .env.development`
4. Install pm2 globally if you want to use pm2 `npm install pm2@latest -g`

#### With Docker

1. Clone repo `git clone git@github.com:tonykaram1993/typescript-express-starter.git`
2. `docker-compose up`

## Code structure

```
/dist
/src
  /configs
  /controllers
  /helpers
  /logs
  /middlewares
  /models
  /routers
  /routes
  /services
  /specs
  /utils
  /validation
    /declarations
    /schemas
    /types
/tests
  /services
  /utils
```
