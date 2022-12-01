import express, { Express } from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";

import indexRoute from "./routes/index.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Routes
app.use(indexRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.log("info", `Server is running at https://localhost:${port}`);
});
