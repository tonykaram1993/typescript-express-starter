import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import "source-map-support/register";

// Routes
import indexRoutes from "./routes/index.route";
import authenticationRoutes from "./routes/authentication.route";
import userRoutes from "./routes/user.route";

// Specs
import swaggerDocument from "./specs/swagger.json";

// Configs
import swaggerOptions from "./configs/swagger.config";
import globalsConfig from "./configs/globals.config";

// Utils
import mongo from "./utils/mongo.util";
import logger from "./utils/logger.util";
import envVariable from "./utils/envVariable.util";

// Middlewares
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";

const PORT = envVariable.getSingle(globalsConfig.ENV_VARIABLES.PORT);

mongo.connect();

const app: Express = express();

// Routes
app.use(indexRoutes.unauthenticatedRouter);
app.use("/authentication", authenticationRoutes.unauthenticatedRouter);
app.use("/authentication", authenticationRoutes.authenticatedRouter);
app.use("/users", userRoutes.authenticatedRouter);

// Swagger
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, swaggerOptions)
);

// Error handler
// ! (keep error handling middleware last, after other app.use() and routes calls)
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    logger.log("info", `Server is running at https://localhost:${PORT}`);
});
