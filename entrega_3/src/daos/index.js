import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
import CarritosDaoMongoDb from "./carritos/CarritosDaoMongoDb.js";

let productosDao;
let carritosDao;

process.env.DB = "MongoDb";

switch (process.env.DB) {
  case "MongoDb":
    productosDao = ProductosDaoMongoDb;
    carritosDao = CarritosDaoMongoDb;
    break;
}

export { productosDao, carritosDao };
