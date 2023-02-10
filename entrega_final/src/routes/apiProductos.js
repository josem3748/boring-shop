import express from "express";
import {
  productosGetAll,
  productosGetId,
  productosGetCategory,
  productosPost,
  productosPut,
  productosDelete,
} from "../controllers/ControllerProductos.js";

const { Router } = express;
const apiProductos = Router();

apiProductos.get("/", productosGetAll);
apiProductos.get("/:id", productosGetId);
apiProductos.get("/c/:categoria", productosGetCategory);
apiProductos.post("/", productosPost);
apiProductos.put("/:id", productosPut);
apiProductos.delete("/:id", productosDelete);

export default apiProductos;
