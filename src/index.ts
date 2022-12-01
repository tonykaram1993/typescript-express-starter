import express, { Express } from "express";
import dotenv from "dotenv";

import indexRoute from "./routes/index.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Routes
app.use(indexRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at https://localhost:${port}`);
});
