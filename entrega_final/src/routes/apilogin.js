import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  apiLoginGet,
  apiLoginPost,
} from "../controllers/ControllerApiLogin.js";

const { Router } = express;
const apilogin = Router();

apilogin.use(cookieParser());
apilogin.use(
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

apilogin.get("/apilogin", apiLoginGet);
apilogin.post("/apilogin", apiLoginPost);

export default apilogin;
