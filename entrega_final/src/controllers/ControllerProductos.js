import ServiciosProductos from "../services/ServiceProductos.js";
const productos = new ServiciosProductos();

const administrador = process.env.ADMIN;

const productosGetAll = async (req, res) => {
  const resultado = await productos.getAll();
  res.send(resultado);
};

const productosGetId = async (req, res) => {
  const { id } = req.params;
  const resultado = await productos.getById(id);
  res.send(resultado);
};

const productosGetCategory = async (req, res) => {
  const { categoria } = req.params;
  const resultado = await productos.getByCategory(categoria);
  res.send(resultado);
};

const productosPost = async (req, res) => {
  if (administrador) {
    const productoAdicional = req.body;
    const resultado = await productos.saveProduct(productoAdicional);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
};

const productosPut = async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const productoAEditar = req.body;
    const resultado = await productos.editById(id, productoAEditar);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
};

const productosDelete = async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const resultado = await productos.deleteById(id);
    res.send(resultado);
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
  productosGetCategory,
  productosPost,
  productosPut,
  productosDelete,
};
