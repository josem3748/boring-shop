import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
import CarritosDaoMongoDb from "./carritos/CarritosDaoMongoDb.js";
import UsuariosDaoMongoDb from "./usuarios/UsuariosDaoMongoDb.js";

let productosDao;
let carritosDao;
let usuariosDao;

process.env.DB = "MongoDb";

switch (process.env.DB) {
  case "MongoDb":
    productosDao = ProductosDaoMongoDb;
    carritosDao = CarritosDaoMongoDb;
    usuariosDao = UsuariosDaoMongoDb;
    break;
}

export { productosDao, carritosDao, usuariosDao };
