import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { chatGet, chatGetEmail } from "../controllers/ControllerChat.js";

const { Router } = express;
const chat = Router();

chat.use(cookieParser());
chat.use(
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

chat.get("/chat", chatGet);
chat.get("/chat/:email", chatGetEmail);

export default chat;
