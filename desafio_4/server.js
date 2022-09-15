const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Router } = express;
const router = Router();

const productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

/* const productoAdicional = {
  "title": "Celular",
  "price": 345.67,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}; */

app.use("/api/productos", router);

app.use("/", express.static(__dirname + "/public"));

///////////////////////////////////// Router /api/productos /////////////////////////////////////

// GET ALL
router.get("/", (req, res) => {
  res.status(200).json(productos);
});

// GET ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  let producto = productos.find((producto) => producto.id === parseInt(id));
  !producto && res.status(200).json({ error: "producto no encontrado" });
  res.status(200).json(producto);
});

// POST
router.post("/", (req, res) => {
  const ids = productos.map((object) => {
    return object.id;
  });
  let nuevoId = 1;
  if (ids.length > 0) nuevoId = Math.max(...ids) + 1;
  const productoAdicional = req.body;
  productoAdicional.id = nuevoId;
  productos.push(productoAdicional);

  res.status(200).json(productos);
});

// PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let producto = productos.find((producto) => producto.id === parseInt(id));

  if (!producto) {
    res.status(200).json({ error: "producto no encontrado" });
  } else {
    const { title, price, thumbnail } = req.body;

    title && (producto.title = title);
    price && (producto.price = price);
    thumbnail && (producto.thumbnail = thumbnail);

    let nuevosProductos = productos.filter(
      (producto) => producto.id !== parseInt(id)
    );

    nuevosProductos.push(producto);

    console.log(nuevosProductos);

    res.status(200).json(producto);
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let producto = productos.find((producto) => producto.id === parseInt(id));
  if (!producto) {
    res.status(200).json({ error: "producto no encontrado" });
  } else {
    let nuevosProductos = productos.filter(
      (producto) => producto.id !== parseInt(id)
    );

    console.log(nuevosProductos);

    res.status(200).json({ mensaje: `Producto con ID ${id} eliminado.` });
  }
});

///////////////////////////////////// Router /api/productos /////////////////////////////////////

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
