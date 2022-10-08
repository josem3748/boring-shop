import { optionsMDB } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(optionsMDB);

const productosIniciales = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-64.png",
  },
];

(async () => {
  try {
    // Eliminando la tabla
    await db.schema
      .dropTableIfExists("productos")
      .then(() => console.log("---> Tabla eliminada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    // Creando tabla
    await db.schema
      .createTable("productos", (table) => {
        table.string("title").notNullable();
        table.float("price");
        table.string("thumbnail").notNullable();
        table.increments("id").primary().notNullable();
      })
      .then(() => console.log("---> Tabla productos creada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    // Insertando data inicial
    await db("productos")
      .insert(productosIniciales)
      .then(() => console.log("---> Data de muestra insertada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
