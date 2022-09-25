// Desafío Manejo de Archivos en Javascript

const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
  async save(Object) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      archivoParseado.push(Object);

      const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`We added a message.`);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      //console.log(JSON.parse(contenidoArchivo));
      return JSON.parse(contenidoArchivo);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombre, "[]", "utf-8");
      console.log("All data has been deleted.");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { Contenedor };
