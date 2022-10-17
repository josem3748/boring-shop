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
  const query = db.collection("usuarios");
  // CREATE
  try {
    // const doc = query.doc() // para generación automática del id
    let id = 1;
    let doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "Jose", dni: 36865861 });
    id++;
    doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "Ana", dni: 36865862 });
    id++;
    doc = query.doc(`${id}`); // para generación manual del id
    await doc.create({ nombre: "Diego", dni: 36865863 });

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
      dni: doc.data().dni,
    }));

    console.log(response);
  } catch (error) {
    console.log(error);
  }
  // READ ID
  try {
    let id = 2;
    let doc = query.doc(`${id}`);
    const item = await doc.get();
    const response = item.data();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
  // UPDATE
  try {
    let id = 2;
    let doc = query.doc(`${id}`);
    const item = await doc.update({ dni: 29372497 });

    console.log("El usuario ha sido actualizado.", item);
  } catch (error) {
    console.log(error);
  }
  // DELETE
  try {
    let id = 1;
    let doc = query.doc(`${id}`);
    const item = await doc.delete();

    console.log("El usuario ha sido borrado exitosamente.", item);
  } catch (error) {
    console.log(error);
  }
};

CRUD();
