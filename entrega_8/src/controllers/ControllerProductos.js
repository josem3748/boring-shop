import ServiciosProductos from "../services/ServiceProductos.js";
const productos = new ServiciosProductos();

const administrador = process.env.admin;

const productosGetAll = async (ctx) => {
  const resultado = await productos.getAll();
  ctx.body = resultado;
};

const productosGetId = async (ctx) => {
  const id = ctx.params.id;
  const resultado = await productos.getById(id);
  ctx.body = resultado;
};

const productosPost = async (ctx) => {
  if (administrador) {
    const productoAdicional = ctx.request.body;
    const resultado = await productos.saveProduct(productoAdicional);
    ctx.body = resultado;
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
};

const productosPut = async (ctx) => {
  if (administrador) {
    const id = ctx.params.id;
    const productoAEditar = ctx.request.body;
    const resultado = await productos.editById(id, productoAEditar);
    ctx.body = resultado;
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
};

const productosDelete = async (ctx) => {
  if (administrador) {
    const id = ctx.params.id;
    const resultado = await productos.deleteById(id);
    ctx.body = resultado;
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
};

export {
  productosGetAll,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
};
