import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  apiLoginGet,
  apiLoginPost,
} from "../controllers/ControllerApiLogin.js";
import * as dotenv from "dotenv";

process.env.NODE_ENV === "development"
  ? dotenv.config({
      path: ".env.test",
    })
  : dotenv.config();

const { Router } = express;
const apilogin = Router();

apilogin.use(cookieParser());
apilogin.use(
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

apilogin.get("/apilogin", apiLoginGet);
apilogin.post("/apilogin", apiLoginPost);

export default apilogin;
