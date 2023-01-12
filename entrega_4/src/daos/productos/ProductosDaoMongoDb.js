import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import { connectionMongoDb as connection } from "../../db/config.js";
import productosModel from "../../models/productosModel.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, productosModel);
  }
}

export default ProductosDaoMongoDb;
