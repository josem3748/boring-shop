import ServiciosProductos from "../services/ServiceProductos.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const productos = new ServiciosProductos();

const imageProductsGetById = async (req, res) => {
  const { productoid } = req.params;
  const product = await productos.getById(productoid);
  if (
    fs.existsSync(path.join(__dirname, `../public/images/${product._id}.jpg`))
  ) {
    res.sendFile(path.join(__dirname, `../public/images/${product._id}.jpg`));
  } else if (
    fs.existsSync(path.join(__dirname, `../public/images/${product._id}.png`))
  ) {
    res.sendFile(path.join(__dirname, `../public/images/${product._id}.png`));
  } else {
    res.send({ error: "The image does not exist." }).json();
  }
};

export { imageProductsGetById };
