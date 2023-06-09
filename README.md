### TODO

1. **DONE** eslint
2. **DONE** prettier
3. **DONE** winston logger
4. **DONE** github actions
5. **DONE** mongodb
6. **ABONDONNED** typegoose
7. pm2
8. jest
9. **DONE** swagger
10. **DONE** swc
11. **DONE** structure
12. **DONE** .env file loading based on ENV
13. **DONE** morgan
14. chalk
15. authentication
16. **DONE** helmet
17. Add example validation with zod
18. **DONE** Add example service
19. **DONE** Add example controller
20. Add example middleware
21. Error handler middleware
22. Env variable types

### How to install

1. Clone repo `git clone git@github.com:tonykaram1993/typescript-express-starter.git`
2. npm install `npm i` - npm is necessary for github actions to work, if you want yarn you must edit .github/workflows/main.yml to use that instead
3. Rename `.env.example` to `.env.development` - `cp .env.example .env.development`

### Code structure

```
/config
/controllers
/types
/logs
/middlewares
/models
/routers
/routes
/services
/specs
/utils
```
