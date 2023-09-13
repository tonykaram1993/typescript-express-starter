import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

// Config
import globalsConfig from "../configs/globals.config";

// Utils
import rateLimiter from "../utils/limiter.util";
import envVariable from "../utils/envVariable.util";

// Middlewares
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = Router({
    mergeParams: true,
});

const NODE_ENV = envVariable.getSingle(globalsConfig.ENV_VARIABLES.NODE_ENV);

// Cors
router.use(cors());

// Requests logging
router.use(morgan("dev"));

// Helmet (security headers)
router.use(
    helmet({
        contentSecurityPolicy:
            NODE_ENV === globalsConfig.ENVIRONMENTS.PRODUCTION,
    })
);

// Rate limiter
router.use(rateLimiter);

// Body Parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));

// Authentication
router.use(authenticationMiddleware);

// Public files
router.use(express.static("public"));

export default router;
