import { options } from "./options/SQLite3.js";
import { crearTabla } from "./create_table.js";
import knex from "knex";

const db = knex(options);

const articulos = [
  { nombre: "Audi", codigo: "A52642", precio: 234324, stock: 2 },
  { nombre: "Mercedes", codigo: "B52642", precio: 65324, stock: 1 },
  { nombre: "Bmw", codigo: "C52642", precio: 23524, stock: 2 },
  { nombre: "Porsche", codigo: "D52642", precio: 23333, stock: 3 },
  { nombre: "Honda", codigo: "E52642", precio: 11111, stock: 4 },
];

(async () => {
  try {
    console.log("---> Borramos todo");
    await db.schema.dropTableIfExists("articulos");

    //console.log("---> Creamos tabla");
    await crearTabla(db).then(console.log("---> Creamos tabla"));

    /*     console.log("---> Creamos tabla");
    await db.schema.createTable("articulos", (table) => {
      table.string("nombre", 15).notNullable();
      table.string("codigo", 10).notNullable();
      table.float("precio");
      table.integer("stock");
      table.increments("id").primary().notNullable();
    }); */

    console.log("---> Insertamos data");
    await db("articulos").insert(articulos);

    console.log("---> Leemos tabla");
    let rows = await db("articulos").select("*");
    for (const row of rows) {
      console.log(
        `${row["id"]} ${row["nombre"]} ${row["codigo"]} ${row["precio"]} ${row["stock"]}`
      );
    }

    console.log("---> Quitamos el ID 3");
    await db("articulos").where("id", "3").del();

    console.log("---> Leemos tabla actualizada");
    rows = await db("articulos").select("*");
    for (const row of rows) {
      console.log(
        `${row["id"]} ${row["nombre"]} ${row["codigo"]} ${row["precio"]} ${row["stock"]}`
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
