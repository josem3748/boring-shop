import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import ordenesModel from "../../models/ordenesModel.js";

class OrdenesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(ordenesModel);
  }
}

export default OrdenesDaoMongoDb;
