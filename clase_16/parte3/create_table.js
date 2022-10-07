import { options } from "./options/SQLite3.js";
import knex from "knex";

const db = knex(options);

const crearTabla = async (db) => {
  await db.schema
    .createTable("articulos", (table) => {
      table.string("nombre", 15).notNullable();
      table.string("codigo", 10).notNullable();
      table.float("precio");
      table.integer("stock");
      table.increments("id").primary().notNullable();
    })
    .then(() => console.log("---> Tabla creada"))
    .catch((err) => {
      console.log(err);
      throw err;
    });
  //.finally(() => db.destroy());
};

//crearTabla(db);

export { crearTabla };
