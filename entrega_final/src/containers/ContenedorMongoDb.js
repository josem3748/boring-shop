import { loggerConsole, loggerFile } from "../utils/loggers.js";
import connectionMongoDb from "../db/configMongoDb.js";

connectionMongoDb.connection();

class ContenedorMongoDb {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    try {
      let registros = await this.model.find({});

      return registros;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(id) {
    try {
      let registro = await this.model.findOne({ id: id });

      if (!registro) {
        registro = await this.model.findOne({ _id: id });

        if (!registro) {
          loggerConsole.info("El registro no existe.");
          return { error: "registro no encontrado" };
        }
      }

      return registro;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async save(Object) {
    try {
      const nuevoRegistro = new this.model(Object);
      const registroGuardado = await nuevoRegistro.save();

      if (Object.id) {
        loggerConsole.info(`Registro agregado con id ${Object.id}`);
      } else {
        loggerConsole.info(`Registro agregado con id ${registroGuardado._id}`);
      }

      return registroGuardado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async editById(id, Objeto) {
    try {
      let registro = await this.model.findOne({ id: id });

      if (!registro) {
        registro = await this.model.findOne({ _id: id });

        if (!registro) {
          loggerConsole.info("El registro no existe.");
          return { error: "registro no encontrado" };
        } else {
          let keys = Object.keys(Objeto);

          await keys.forEach(async (elem) => {
            const objeto = {};
            objeto[elem] = Objeto[elem];
            registro[elem] = Objeto[elem];
            await this.model.updateOne({ _id: id }, { $set: objeto });
          });

          loggerConsole.info(`Registro editado con id ${id}`);

          return registro;
        }
      }

      let keys = Object.keys(Objeto);

      await keys.forEach(async (elem) => {
        const objeto = {};
        objeto[elem] = Objeto[elem];
        registro[elem] = Objeto[elem];
        await this.model.updateOne({ id: id }, { $set: objeto });
      });

      loggerConsole.info(`Registro editado con id ${id}`);

      return registro;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(id) {
    try {
      let registro = await this.model.findOne({ id: id });

      if (!registro) {
        registro = await this.model.findOne({ _id: id });

        if (!registro) {
          loggerConsole.info("El registro no existe.");
          return { error: "registro no encontrado" };
        } else {
          await this.model.deleteOne({ _id: id });
          loggerConsole.info(`Registro con id ${id} eliminado.`);
          return registro;
        }
      }

      await this.model.deleteOne({ id: id });
      loggerConsole.info(`Registro con id ${id} eliminado.`);
      return registro;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export { ContenedorMongoDb };
