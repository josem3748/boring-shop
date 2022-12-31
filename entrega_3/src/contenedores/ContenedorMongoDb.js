import { loggerConsole, loggerFile } from "../server.js";

// Clase Contenedor

class ContenedorMongoDb {
  constructor(connection, model) {
    this.connection = connection;
    this.model = model;
  }
  async saveProduct(Object) {
    try {
      await this.connection();

      let productos = await this.model.find({});

      const ids = productos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      const productoSaveModel = new this.model(Object);
      await productoSaveModel.save();

      loggerConsole.info(`Registro agregado con id ${nuevoId}`);

      return Object;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async saveCart(Array, userid) {
    try {
      await this.connection();

      let carritos = await this.model.find({});

      const ids = carritos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      const nuevoCarrito = {
        id: nuevoId,
        timestamp: Date.now(),
        productos: Array,
        userid: userid,
      };

      const carritoSaveModel = new this.model(nuevoCarrito);
      await carritoSaveModel.save();

      loggerConsole.info(`Registro agregado con id ${nuevoId}`);

      return nuevoId;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async editById(id, Object) {
    try {
      await this.connection();

      let productos = await this.model.find({});

      let producto = productos.find((producto) => producto.id === parseInt(id));

      if (!producto) {
        return { error: "registro no encontrado" };
      } else {
        const { nombre, descripcion, codigo, precio, stock, timestamp, foto } =
          Object;

        nombre &&
          (await this.model.updateOne(
            { id: id },
            { $set: { nombre: nombre } }
          ));
        descripcion &&
          (await this.model.updateOne(
            { id: id },
            { $set: { descripcion: descripcion } }
          ));
        codigo &&
          (await this.model.updateOne(
            { id: id },
            { $set: { codigo: codigo } }
          ));
        precio &&
          (await this.model.updateOne(
            { id: id },
            { $set: { precio: precio } }
          ));
        stock &&
          (await this.model.updateOne({ id: id }, { $set: { stock: stock } }));
        timestamp &&
          (await this.model.updateOne(
            { id: id },
            { $set: { timestamp: timestamp } }
          ));
        foto &&
          (await this.model.updateOne({ id: id }, { $set: { foto: foto } }));

        loggerConsole.info(`Registro editado con id ${id}`);

        const resultado = await this.model.find({ id: id });

        return resultado;
      }
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async saveById(id, Object) {
    try {
      await this.connection();

      let carritos = await this.model.find({});

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      carrito.productos.push(Object);

      await this.model.updateOne(
        { id: id },
        { $set: { productos: carrito.productos } }
      );

      loggerConsole.info(`Registro con id ${id} editado.`);

      return carrito;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getById(Number) {
    try {
      await this.connection();

      let resultados = await this.model.find({});

      let resultado = resultados.find((elem) => elem.id == Number);

      if (!resultado) return (resultado = { error: "registro no encontrado" });

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getByUserId(ID) {
    try {
      await this.connection();

      let resultados = await this.model.find({});

      let resultado = resultados.find((elem) => elem.userid == ID);

      if (!resultado) return (resultado = { error: "registro no encontrado" });

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getAll() {
    try {
      await this.connection();

      let resultados = await this.model.find({});

      return resultados;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async deleteById(Number) {
    try {
      await this.connection();

      let resultados = await this.model.find({});

      const resultado = resultados.find((elem) => elem.id == Number);

      if (!resultado) {
        loggerConsole.info("El registro no existe.");
        return { error: "registro no encontrado" };
      }

      await this.model.deleteOne({ id: Number });

      loggerConsole.info(`Registro con ID ${Number} eliminado.`);

      return resultado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      await this.connection();

      let carritos = await this.model.find({});

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      let producto = carrito.productos.find(
        (producto) => producto.id === parseInt(id_prod)
      );

      if (!producto) {
        return { error: "registro no encontrado" };
      }

      let nuevosProductos = carrito.productos.filter(
        (producto) => producto.id !== parseInt(id_prod)
      );

      carrito.productos = nuevosProductos;

      await this.model.updateOne(
        { id: id },
        { $set: { productos: nuevosProductos } }
      );

      loggerConsole.info(`Registro con id ${id} editado.`);

      return carrito;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
}

export { ContenedorMongoDb };
