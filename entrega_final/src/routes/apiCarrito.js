import express from "express";
import {
  carritosGetAll,
  carritosPost,
  carritosPut,
  carritosDelete,
  carritosGetId,
  carritosPostId,
  carritosDeleteId,
} from "../controllers/ControllerCarritos.js";

const { Router } = express;
const apiCarrito = Router();

apiCarrito.get("/", carritosGetAll);
apiCarrito.post("/", carritosPost);
apiCarrito.put("/:id", carritosPut);
apiCarrito.delete("/:id", carritosDelete);
apiCarrito.get("/:id/productos", carritosGetId);
apiCarrito.post("/:id/productos", carritosPostId);
apiCarrito.delete("/:id/productos/:id_prod", carritosDeleteId);

export default apiCarrito;
