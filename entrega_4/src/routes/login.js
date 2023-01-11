import express from "express";
const { Router } = express;

const login = Router();

import { passport } from "../middlewares/passport.js";

import cookieParser from "cookie-parser";
import session from "express-session";
login.use(cookieParser());

login.use(
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

import {
  loginGet,
  loginPost,
  loginFailGet,
  logoutGet,
} from "../controllers/ControllerLogin.js";

login.get("/login", loginGet);
login.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  loginPost
);
login.get("/faillogin", loginFailGet);
login.get("/logout", logoutGet);

export default login;
