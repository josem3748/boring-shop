import express from "express";
import { getConfig } from "../controllers/ControllerConfig.js";

const { Router } = express;
const config = Router();

config.get("/", getConfig);

export default config;
