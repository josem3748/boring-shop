import Koa from "koa";
import { koaBody } from "koa-body";
import apiProductos from "./routes/apiProductos.js";

const app = new Koa();

app.use(koaBody());

app.use(apiProductos.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor Koa ${e}`));
