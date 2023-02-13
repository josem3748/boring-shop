import mongoose from "mongoose";

const mensajesCollection = "mensajes";

const MensajeSchema = new mongoose.Schema({
  author: {
    id: { type: String },
  },
  tipo: { type: String },
  fecha: { type: String },
  text: { type: String },
  respuesta: { type: String },
});

const mensajesModel = mongoose.model(mensajesCollection, MensajeSchema);

export default mensajesModel;
