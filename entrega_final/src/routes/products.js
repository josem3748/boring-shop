import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  productsGet,
  productsGetCategory,
  productsGetById,
} from "../controllers/ControllerProducts.js";

const { Router } = express;
const products = Router();

products.use(cookieParser());
products.use(
  session({
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

products.get("/products", productsGet);
products.get("/products/c/:categoria", productsGetCategory);
products.get("/products/p/:id", productsGetById);

export default products;
