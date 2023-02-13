import mongoose from "mongoose";

const ordenesCollection = "ordenes";

const OrdenSchema = new mongoose.Schema({
  id: { type: Number },
  timestamp: { type: Number },
  items: { type: Array },
  userid: { type: String },
  useremail: { type: String },
  estado: { type: String },
});

const ordenesModel = mongoose.model(ordenesCollection, OrdenSchema);

export default ordenesModel;
