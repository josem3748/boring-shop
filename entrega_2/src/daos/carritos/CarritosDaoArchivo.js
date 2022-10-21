import { ContenedorArchivo } from "../../contenedores/ContenedorArchivo.js";
import { connectionArchivo as connection } from "../../config.js";

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super(connection, "../dbArchivo/carts.txt");
  }
}

export default CarritosDaoArchivo;
