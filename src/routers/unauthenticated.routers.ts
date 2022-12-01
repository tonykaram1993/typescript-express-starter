import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const router = Router({
  mergeParams: true,
});

// Cors
router.use(cors());

// Body Parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));

// Public files
router.use(express.static("public"));

export default router;
