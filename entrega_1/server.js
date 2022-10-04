//const express = require("express");
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static("public"));

const { Router } = express;

//const contenedor = require("./classes/contenedor.js");
//const carro = require("./classes/contenedorCarrito.js");

import { Contenedor } from "./classes/contenedor.js";
import { Carrito } from "./classes/contenedorCarrito.js";

const administrador = true;

//////////////////////////////////////////////////////////////////////////////////////////////////

//const productos = new contenedor.Contenedor("./data/products.txt");
const productos = new Contenedor("./data/products.txt");
const apiProductos = Router();
app.use("/api/productos", apiProductos);

///////////////////////////////////// Router /api/productos /////////////////////////////////////

// GET ALL
apiProductos.get("/", async (req, res) => {
  const resultado = await productos.getAll();
  res.send(resultado);
});

// GET ID
apiProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await productos.getById(id);
  res.send(resultado);
});

// POST
apiProductos.post("/", async (req, res) => {
  if (administrador) {
    const productoAdicional = req.body;
    const resultado = await productos.save(productoAdicional);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

// PUT
apiProductos.put("/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const productoAEditar = req.body;
    const resultado = await productos.saveById(id, productoAEditar);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

// DELETE
apiProductos.delete("/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const resultado = await productos.deleteById(id);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

///////////////////////////////////// Router /api/productos /////////////////////////////////////

//const carrito = new carro.Carrito("./data/carts.txt");
const carrito = new Carrito("./data/carts.txt");
const apiCarrito = Router();
app.use("/api/carrito", apiCarrito);

///////////////////////////////////// Router /api/carrito //////////////////////////////////////

// GET ALL
apiCarrito.get("/", async (req, res) => {
  const resultado = await carrito.getAll();
  res.send(resultado);
});

// POST
apiCarrito.post("/", async (req, res) => {
  const carritoAdicional = req.body;
  const resultado = await carrito.save(carritoAdicional);
  res.send({ idNuevoCarrito: resultado });
});

// DELETE
apiCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.deleteById(id);
  res.send(resultado);
});

// GET ID
apiCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.getById(id);
  res.send(resultado);
});

// POST ID
apiCarrito.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const productoAdicional = req.body;
  const resultado = await carrito.saveById(id, productoAdicional);
  res.send(resultado);
});

// DELETE ID
apiCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const resultado = await carrito.deleteByProduct(id, id_prod);
  res.send(resultado);
});

///////////////////////////////////// Router /api/carrito //////////////////////////////////////

// this is default in case of unmatched routes
app.use((req, res) => {
  // Invalid request
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
