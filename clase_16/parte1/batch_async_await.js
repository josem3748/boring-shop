import { options } from "./options/mariaDB.js";
import { cars } from "./insert_cars.js";
import knex from "knex";

const db = knex(options);

/* const cars = [
  { name: "Audi", price: 52642 },
  { name: "Mercedes", price: 57127 },
  { name: "Skoda", price: 9000 },
  { name: "Volvo", price: 29000 },
  { name: "Bentley", price: 350000 },
  { name: "Citroen", price: 21000 },
  { name: "Hummer", price: 41400 },
  { name: "Volskwagen", price: 21600 },
]; */

(async () => {
  try {
    console.log("---> Borramos todos los autos");
    await db("cars").del();

    console.log("---> Insertamos autos");
    await db("cars").insert(cars);

    console.log("---> Leemos todos los autos");
    let rows = await db("cars").select("*");
    for (const row of rows) {
      console.log(`${row["id"]} ${row["name"]} ${row["price"]}`);
    }

    console.log("---> Insertamos un auto más");
    await db("cars").insert({ name: "Fiat", price: 7777 });

    console.log("---> Leemos los autos actualizados");
    rows = await db("cars").select("*");
    for (const row of rows) {
      console.log(`${row["id"]} ${row["name"]} ${row["price"]}`);
    }
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
