import admin from "firebase-admin";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ServiceAccount = require("./db/jm-boring-shop-firebase-adminsdk-i6ixe-556e464894.json");

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});

console.log("Firebase conectada!");

const CRUD = async () => {
  const db = admin.firestore();
  const query = db.collection("colores");
  // CREATE
  try {
    // const doc = query.doc() // para generación automática del id
    let id = 1;
    let doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "red" });
    id++;
    doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "green" });
    id++;
    doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "blue" });

    console.log("Datos registrados");
  } catch (error) {
    console.log(error);
  }
  // READ ALL
  try {
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
    }));

    console.log(response);
  } catch (error) {
    console.log(error);
  }
  // UPDATE
  try {
    const querySnapshot = await query.where("nombre", "==", "blue").get();
    let docs = querySnapshot.docs;

    docs.forEach((doc) => {
      doc.ref.update({ nombre: "navy" });
      console.log(`El color con id ${doc.id} ha sido actualizado.`);
    });
  } catch (error) {
    console.log(error);
  }
  // DELETE
  try {
    const querySnapshot = await query.where("nombre", "==", "green").get();
    let docs = querySnapshot.docs;
    docs.forEach((doc) => {
      doc.ref.delete();
      console.log(`El color con id ${doc.id} ha sido borrado.`);
    });
  } catch (error) {
    console.log(error);
  }
};

CRUD();
