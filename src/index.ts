import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";

// Routes
import indexRoute from "./routes/index.route";

// Specs
import swaggerDocument from "./specs/swagger.json";

// Configs
import swaggerOptions from "./configs/swagger.config";
import globalsConfig from "./configs/globals.config";
import defaultsConfig from "./configs/defaults.config";

// Utils
import db from "./utils/db.util";
import logger from "./utils/logger.util";

db.connect();

const app: Express = express();
const { PORT } = process.env || defaultsConfig.APP.PORT;
const { NODE_ENV } = process.env;

// Routes
app.use(indexRoute);

// Swagger
if (NODE_ENV !== globalsConfig.ENVIRONMENTS.PRODUCTION) {
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, swaggerOptions)
  );
}

app.listen(PORT, () => {
  logger.log("info", `Server is running at https://localhost:${PORT}`);
});
