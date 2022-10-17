import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, require: true, max: 100 },
  apellido: { type: String, require: true, max: 100 },
  dni: { type: String, require: true, max: 100 },
});

const usuarios = mongoose.model(usuariosCollection, UsuarioSchema);
const model = { usuarios };

const CRUD = async () => {
  try {
    // Conexión a la base de datos
    const URL =
      "mongodb+srv://username:q8c78jOEU8NO8Y2W@cluster0.jldiu.mongodb.net/ecommerce?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
    // READ ALL
    console.log("READ ALL");
    let usuarios = await model.usuarios.find({});
    console.log(usuarios);
    /*     // CREATE
    console.log("CREATE");
    const usuario = [
      { nombre: "Federico", apellido: "Perez", dni: "320118321" },
    ];
    usuarios = await model.usuarios.insertMany(usuario);
    console.log(usuarios); */
    // Apagando la conexión
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

CRUD();
