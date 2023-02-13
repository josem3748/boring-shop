import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { homeGet } from "../controllers/ControllerHome.js";

const { Router } = express;
const home = Router();

home.use(cookieParser());
home.use(
  session({
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: process.env.SESSIONTIMEMINS * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

home.get("/", homeGet);

export default home;
