import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

// Config
import globalsConfig from "../configs/globals.config";

// Utils
import rateLimiter from "../utils/limter.util";

const { NODE_ENV } = process.env;

const router = Router({
  mergeParams: true,
});

// Cors
router.use(cors());

// Requests logging
router.use(morgan("dev"));

// Helmet (security headers)
router.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === globalsConfig.ENVIRONMENTS.PRODUCTION,
  })
);

// Rate limiter
router.use(rateLimiter);

// Body Parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));

// Public files
router.use(express.static("public"));

export default router;
