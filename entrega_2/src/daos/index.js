import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";

import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
import CarritosDaoMongoDb from "./carritos/CarritosDaoMongoDb.js";

import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";

import ProductosDaoMariaDb from "./productos/ProductosDaoMariaDb.js";
import CarritosDaoMariaDb from "./carritos/CarritosDaoMariaDb.js";

import ProductosDaoSQLite3 from "./productos/ProductosDaoSQLite3.js";
import CarritosDaoSQLite3 from "./carritos/CarritosDaoSQLite3.js";

let productosDao;
let carritosDao;

process.env.DB = "MongoDb";

console.log(process.env.DB);

switch (process.env.DB) {
  case "Archivo":
    productosDao = ProductosDaoArchivo;
    carritosDao = CarritosDaoArchivo;
    break;
  case "MongoDb":
    productosDao = ProductosDaoMongoDb;
    carritosDao = CarritosDaoMongoDb;
    break;
  case "Firebase":
    productosDao = ProductosDaoFirebase;
    carritosDao = CarritosDaoFirebase;
    break;
  case "MariaDb":
    productosDao = ProductosDaoMariaDb;
    carritosDao = CarritosDaoMariaDb;
    break;
  case "SQLite3":
    productosDao = ProductosDaoSQLite3;
    carritosDao = CarritosDaoSQLite3;
    break;
}

export { productosDao, carritosDao };
