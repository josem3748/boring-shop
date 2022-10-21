import { ContenedorMariaDb } from "../../contenedores/ContenedorMariaDb.js";
import { connectionMariaDb as connection } from "../../config.js";

const table = "carritos";

class CarritosDaoMariaDb extends ContenedorMariaDb {
  constructor() {
    super(connection, table);
  }
}

export default CarritosDaoMariaDb;
