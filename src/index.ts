import express, { Express } from "express";
import dotenv from "dotenv";

import db from "./utils/db";
import logger from "./utils/logger";
import indexRoute from "./routes/index.routes";

dotenv.config();
db.connect();

const app: Express = express();
const { PORT } = process.env;

// Routes
app.use(indexRoute);

app.listen(PORT, () => {
  logger.log("info", `Server is running at https://localhost:${PORT}`);
});
