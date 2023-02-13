import express from "express";
import { getInfo } from "../controllers/ControllerInfo.js";

const { Router } = express;
const info = Router();

info.get("/", getInfo);

export default info;
