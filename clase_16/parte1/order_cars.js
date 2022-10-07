import { options } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(options);

db.from("cars")
  .select("name", "price")
  .orderBy("price", "desc")
  .then((rows) => {
    for (const row of rows) {
      console.log(`${row["name"]} ${row["price"]}`);
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
