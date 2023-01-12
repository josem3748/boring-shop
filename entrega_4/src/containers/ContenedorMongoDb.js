import { loggerConsole, loggerFile } from "../utils/loggers.js";

class ContenedorMongoDb {
  constructor(connection, model) {
    this.connection = connection;
    this.model = model;
  }
  async getAll() {
    try {
      await this.connection();

      let registros = await this.model.find({});

      return registros;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getById(Number) {
    try {
      await this.connection();

      let registros = await this.model.find({});

      let registro = registros.find((elem) => elem.id == Number);

      if (!registro) return (registro = { error: "registro no encontrado" });

      return registro;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async save(Object) {
    try {
      await this.connection();

      const nuevoRegistro = new this.model(Object);
      const registroGuardado = await nuevoRegistro.save();

      loggerConsole.info(`Registro agregado con id ${Object.id}`);

      return registroGuardado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async editById(id, Object) {
    try {
      await this.connection();

      let registros = await this.model.find({});

      let registro = registros.find((registro) => registro.id === parseInt(id));

      if (!registro) {
        return { error: "registro no encontrado" };
      } else {
        let keys = Object.keys(Object);

        keys.forEach(async (elem) => {
          const objeto = {};
          objeto[elem] = Object.elem;
          await this.model.updateOne({ id: id }, { $set: objeto });
        });

        loggerConsole.info(`Registro editado con id ${id}`);

        const registroEditado = await this.model.find({ id: id });

        return registroEditado;
      }
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async deleteById(Number) {
    try {
      await this.connection();

      let registros = await this.model.find({});

      const registro = registros.find((elem) => elem.id == Number);

      if (!registro) {
        loggerConsole.info("El registro no existe.");
        return { error: "registro no encontrado" };
      }

      await this.model.deleteOne({ id: Number });

      loggerConsole.info(`Registro con ID ${Number} eliminado.`);

      return registro;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
}

export { ContenedorMongoDb };
