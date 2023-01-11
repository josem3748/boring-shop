import { ContenedorMongoDb } from "../../contenedores/ContenedorMongoDb.js";
import { connectionMongoDb as connection } from "../../config.js";

import mongoose from "mongoose";

const carritosCollection = "carritos";

const CarritoSchema = new mongoose.Schema({
  id: { type: Number },
  timestamp: { type: Number },
  productos: { type: Array },
  userid: { type: String },
});

const carritosModel = mongoose.model(carritosCollection, CarritoSchema);

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, carritosModel);
  }
}

export default CarritosDaoMongoDb;
