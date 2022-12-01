import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const router = Router({
  mergeParams: true,
});

// Cors
router.use(cors());

// Requests logging
router.use(morgan("dev"));

// Body Parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));

// Public files
router.use(express.static("public"));

export default router;
