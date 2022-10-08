import { optionsMDB } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(optionsMDB);

db.from("productos")
  .select("*")
  .then((rows) => {
    for (const row of rows) {
      console.log(
        `${row["id"]} ${row["title"]} ${row["price"]} ${row["thumbnail"]}`
      );
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
