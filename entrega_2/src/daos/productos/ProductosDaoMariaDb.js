import { ContenedorMariaDb } from "../../contenedores/ContenedorMariaDb.js";
import { connectionMariaDb as connection } from "../../config.js";

const table = "productos";

class ProductosDaoMariaDb extends ContenedorMariaDb {
  constructor() {
    super(connection, table);
  }
}

export default ProductosDaoMariaDb;
