import express from "express";
const { Router } = express;

const cart = Router();

import cookieParser from "cookie-parser";
import session from "express-session";
cart.use(cookieParser());

cart.use(
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

import { cartGet, cartPost } from "../controllers/ControllerCart.js";

cart.get("/cart", cartGet);
cart.post("/cart", cartPost);

export default cart;
