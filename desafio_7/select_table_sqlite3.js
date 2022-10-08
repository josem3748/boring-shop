import { optionsSQLite3 } from "./options/SQLite3.js";
import knex from "knex";

const db = knex(optionsSQLite3);

db.from("mensajes")
  .select("*")
  .then((rows) => {
    for (const row of rows) {
      console.log(
        `${row["id"]} ${row["fecha"]} ${row["author"]} ${row["text"]}`
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
