import mongoose from "mongoose";
//const mongoose = require("mongoose");

const estudiantesCollection = "estudiantes";

const EstudianteSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    dni: { type: String, require: true, unique: true },
    curso: { type: String, require: true },
    nota: { type: Number, require: true },
  } /* , { strict: false } */
);

export const estudiantes = mongoose.model(
  estudiantesCollection,
  EstudianteSchema
);

/* const estudiantes = mongoose.model(estudiantesCollection, EstudianteSchema);
module.exports = { estudiantes }; */
