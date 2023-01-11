import express from "express";
const { Router } = express;

const apiProductos = Router();

import {
  productosGetAll,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
} from "../controllers/ControllerProductos.js";

apiProductos.get("/", productosGetAll);
apiProductos.get("/:id", productosGetId);
apiProductos.post("/", productosPost);
apiProductos.put("/:id", productosPut);
apiProductos.delete("/:id", productosDelete);

export default apiProductos;
