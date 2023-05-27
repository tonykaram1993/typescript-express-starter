import express, { Express } from "express";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";

import db from "./utils/db";
import logger from "./utils/logger";
import indexRoute from "./routes/index.routes";
import swaggerDocument from "./specs/swagger.json";
import swaggerOptions from "./config/swagger";

db.connect();

const app: Express = express();
const { PORT } = process.env || 5000;
const { NODE_ENV } = process.env || "development";

// Routes
app.use(indexRoute);

// Swagger
if (NODE_ENV !== "production") {
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, swaggerOptions)
  );
}

app.listen(PORT, () => {
  logger.log("info", `Server is running at https://localhost:${PORT}`);
});
