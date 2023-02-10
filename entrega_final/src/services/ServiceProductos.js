import { loggerConsole, loggerFile } from "../utils/loggers.js";
import repoProductos from "../repos/repoProductos.js";

class ServiciosProductos {
  constructor() {
    this.repoProductos = new repoProductos();
  }
  async saveProduct(Object) {
    try {
      let productos = await this.repoProductos.getAll();

      const ids = productos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      await this.repoProductos.save(Object);

      return Object;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async editById(id, Object) {
    try {
      return await this.repoProductos.editById(id, Object);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let resultado = await this.repoProductos.getById(Number);

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getAll() {
    try {
      return await this.repoProductos.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getByCategory(category) {
    try {
      let resultado = await this.repoProductos.getAll();
      resultado = resultado.filter((elem) =>
        elem.categorias.includes(category)
      );
      if (resultado.length < 1) {
        return { error: "registros no encontrados" };
      }
      return resultado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(Number) {
    try {
      return await this.repoProductos.deleteById(Number);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async tablaProductos(data, user) {
    if (!user) {
      return data
        .map((elem, index) => {
          return `<tr>
                  <td style="color: white;"><a href="/products/p/${elem.id}">${elem.nombre}</a></td>
                  <td style="color: white;">${elem.precio}</td>
                  <td><img src="${elem.foto}" /></td>
                </tr>`;
        })
        .join(" ");
    } else {
      return data
        .map((elem, index) => {
          return `<tr>
                <td style="color: white;"><a href="/products/p/${elem.id}">${elem.nombre}</a></td>
                <td style="color: white;">${elem.precio}</td>
                <td><img src="${elem.foto}" /></td>
                <td><input class="btn addtocart" type="button" data-productid="${elem.id}" value="ADD TO CART"></td>
              </tr>`;
        })
        .join(" ");
    }
  }
}

export default ServiciosProductos;
