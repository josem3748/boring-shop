import express from "express";
const { Router } = express;

const products = Router();

import cookieParser from "cookie-parser";
import session from "express-session";
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

import productsGet from "../controllers/ControllerProducts.js";

products.get("/products", productsGet);

export default products;
