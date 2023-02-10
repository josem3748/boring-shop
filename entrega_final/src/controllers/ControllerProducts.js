import ServiciosProductos from "../services/ServiceProductos.js";
import { loggerConsole, loggerFile } from "../utils/loggers.js";

const productos = new ServiciosProductos();

const productsGet = async (req, res) => {
  const products = await productos.getAll();

  res.status(200).render("products", {
    user: req.session.user,
    body: await productos.tablaProductos(products, req.session.user),
  });
};

const productsGetCategory = async (req, res) => {
  const { categoria } = req.params;
  const products = await productos.getByCategory(categoria);
  if (products.length > 0) {
    res.status(200).render("products", {
      user: req.session.user,
      body: await productos.tablaProductos(products, req.session.user),
    });
  } else {
    loggerConsole.warn(
      `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
    );
    loggerFile.warn(
      `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
    );
    res.json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
  }
};

const productsGetById = async (req, res) => {
  const { id } = req.params;
  const product = await productos.getById(id);

  res.status(200).render("product", {
    user: req.session.user,
    body: product,
  });
  /*
  if (products.length > 0) {
    res.status(200).render("products", {
      user: req.session.user,
      body: await productos.tablaProductos(products, req.session.user),
    });
  } else {
    loggerConsole.warn(
      `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
    );
    loggerFile.warn(
      `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
    );
    res.json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
  } */
};

export { productsGet, productsGetCategory, productsGetById };
