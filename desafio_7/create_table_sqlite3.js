import { optionsSQLite3 } from "./options/SQLite3.js";
import knex from "knex";

const db = knex(optionsSQLite3);

const mensajesIniciales = [
  {
    author: "juan@gmail.com",
    fecha: "22/12/1992 12:32:33",
    text: "Hola",
  },
  {
    author: "pedro@gmail.com",
    fecha: "22/12/1992 12:35:33",
    text: "Cómo va?",
  },
  {
    author: "diego@gmail.com",
    fecha: "22/12/1992 12:38:33",
    text: "Alojaaa",
  },
];

(async () => {
  try {
    // Eliminando la tabla
    await db.schema
      .dropTableIfExists("mensajes")
      .then(() => console.log("---> Tabla eliminada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    // Creando tabla
    await db.schema
      .createTable("mensajes", (table) => {
        table.string("author").notNullable();
        table.string("fecha").notNullable();
        table.string("text").notNullable();
        table.increments("id").primary().notNullable();
      })
      .then(() => console.log("---> Tabla mensajes creada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    // Insertando data inicial
    await db("mensajes")
      .insert(mensajesIniciales)
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
