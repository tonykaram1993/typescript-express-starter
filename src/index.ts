import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import "source-map-support/register";

// Routes
import indexRoute from "./routes/index.route";
import authenticationRoutes from "./routes/authentication.route";

// Specs
import swaggerDocument from "./specs/swagger.json";

// Configs
import swaggerOptions from "./configs/swagger.config";
import globalsConfig from "./configs/globals.config";
import defaultsConfig from "./configs/defaults.config";

// Utils
import db from "./utils/db.util";
import logger from "./utils/logger.util";

// Middlewares
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";

db.connect();

const app: Express = express();
const { PORT } = process.env || defaultsConfig.APP.PORT;
const { NODE_ENV } = process.env;

// Routes
app.use(indexRoute);
app.use("/authentication", authenticationRoutes.unauthenticatedRouter);
app.use("/authentication", authenticationRoutes.authenticatedRouter);

// Swagger
if (NODE_ENV !== globalsConfig.ENVIRONMENTS.PRODUCTION) {
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, swaggerOptions)
  );
}

// Error handler (keep error handling middleware last, after other app.use() and routes calls)
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  logger.log("info", `Server is running at https://localhost:${PORT}`);
});
