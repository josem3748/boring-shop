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

      const ids = archivoParseado.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;

      archivoParseado.push(Object);

      const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");

      console.log(`Producto agregado con id ${nuevoId}`);
    } catch (error) {
      console.log(error);
    }
  }
  async getById(Number) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);
      let resultado = archivoParseado.find((producto) => producto.id == Number);

      if (!resultado) resultado = null;

      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      console.log(JSON.parse(contenidoArchivo));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(Number) {
    try {
      const contenidoArchivo = await fs.promises.readFile(this.nombre, "utf-8");
      const archivoParseado = JSON.parse(contenidoArchivo);

      const productoAEliminar = archivoParseado.find(
        (producto) => producto.id == Number
      );

      if (!productoAEliminar) {
        return console.log("El producto no existe.");
      }

      const resultado = archivoParseado.filter(
        (producto) => producto.id != Number
      );

      const resultadoATexto = JSON.stringify(resultado, null, " ");

      await fs.promises.writeFile(this.nombre, resultadoATexto, "utf-8");
      console.log("Producto eliminado.");
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombre, "[]", "utf-8");
      console.log("Productos borrados.");
    } catch (error) {
      console.log(error);
    }
  }
}

const productos = new Contenedor("productos.txt");

const productoDePrueba = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

// productos.deleteAll();
// productos.save(productoDePrueba);
// productos.save(productoDePrueba);
// productos.save(productoDePrueba);
// productos.save(productoDePrueba);
// productos.save(productoDePrueba);
// productos.getById(4);
// productos.getById(99);
// productos.deleteById(1);
// productos.deleteById(99);
productos.getAll();
