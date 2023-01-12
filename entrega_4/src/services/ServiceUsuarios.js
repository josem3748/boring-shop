import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { transporter } from "../middlewares/nodemailer.js";
import {
  UsuariosDaoMongoDb,
  usuariosModel,
} from "../daos/usuarios/UsuariosDaoMongoDb.js";

class ServiciosUsuarios {
  constructor() {
    this.UsuariosDaoMongoDb = new UsuariosDaoMongoDb();
  }
  async sendMail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
}

export { ServiciosUsuarios, usuariosModel };
