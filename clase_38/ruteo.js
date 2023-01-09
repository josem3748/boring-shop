import express from "express";
const app = express();
const { Router } = express;

import { todas, suma, resta, multi, divi } from "./controller.js";

const apiOperaciones = new Router();

apiOperaciones.get("/todas", todas);
apiOperaciones.get("/suma", suma);
apiOperaciones.get("/resta", resta);
apiOperaciones.get("/multi", multi);
apiOperaciones.get("/divi", divi);

export default apiOperaciones;
