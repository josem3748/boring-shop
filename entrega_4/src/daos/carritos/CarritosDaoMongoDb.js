import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import { connectionMongoDb as connection } from "../../db/config.js";
import carritosModel from "../../models/carritosModel.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, carritosModel);
  }
}

export default CarritosDaoMongoDb;
