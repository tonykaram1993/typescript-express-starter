### TODO

1. **DONE** eslint
2. **DONE** prettier
3. **DONE** winston logger
4. **DONE** github actions
5. **DONE** mongodb
6. **ABANDONED** typegoose
7. **DONE** pm2
8. **DONE** jest
9. **DONE** swagger
10. **DONE** swc
11. **DONE** structure
12. **DONE** .env file loading based on ENV
13. **DONE** morgan
14. authentication
15. **DONE** helmet
16. **DONE** Add example validation with zod
17. **DONE** Add example service
18. **DONE** Add example controller
19. **DONE** Add example middleware
20. **DONE** Env variable types
21. **DONE** Add try/catch utility
22. **DONE** Add support for yarn and pnpm

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
