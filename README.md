### Features

1. Typescript
1. Express
1. MongoDB
1. Zod Validation
1. Eslint
1. Prettier
1. Winston logger
1. Github Actions
1. PM2
1. Jest
1. Swagger
1. SWC
1. Morgan
1. Helmet
1. Add rate limiter

### TODO

1. Add authentication
1. Axios interceptors
1. API versioning

### How to install

1. Clone repo `git clone git@github.com:tonykaram1993/typescript-express-starter.git`
2. `yarn install` - if you wish to use npm or pnpm, you must edit .github/workflows/main.yml to not use `yarn`
3. Copy `.env.example` to `.env.development` - `cp .env.example .env.development`
4. Install pm2 globally if you want to use pm2 `npm install pm2@latest -g`

### Code structure

```
/src
  /config
  /controllers
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
```
