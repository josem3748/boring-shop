import Router from "koa-router";

const apiProductos = new Router({
  prefix: "/api/productos",
});

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
