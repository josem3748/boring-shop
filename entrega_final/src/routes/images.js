import express from "express";
import { imageProductsGetById } from "../controllers/ControllerImages.js";

const { Router } = express;
const images = Router();

images.get("/images/:productoid", imageProductsGetById);

export default images;
