import { ServiciosUsuarios } from "../services/ServiceUsuarios.js";
import usuariosModel from "../models/usuariosModel.js";
import { mailOptions } from "../middlewares/nodemailer.js";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const usuarios = new ServiciosUsuarios();
const app = express();

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    usuariosModel.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        loggerConsole.info("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        loggerConsole.info("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      usuariosModel.findOne({ username: username }, async (err, user) => {
        if (err) {
          loggerConsole.error("Error in SignUp: " + err);
          loggerFile.error("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          loggerConsole.info("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: bcrypt.hashSync(password, 10),
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          avatar: req.file.filename,
        };
        usuariosModel.create(newUser, (err, userWithId) => {
          if (err) {
            loggerConsole.error("Error in Saving user: " + err);
            loggerFile.error("Error in Saving user: " + err);
            return done(err);
          }

          ////////// Nodemailer ///////////

          mailOptions.subject = "nuevo registro";
          mailOptions.html = `
          
          username: ${newUser.username}<br>
          name: ${newUser.name}<br>
          address: ${newUser.address}<br>
          age: ${newUser.age}<br>
          phone: ${newUser.phone}<br>
          avatar: ${newUser.avatar}
          
          `;

          usuarios.sendMail(mailOptions);

          ////////////////////////////////

          //loggerConsole.info(user);
          loggerConsole.info("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  usuariosModel.findById(id, done);
});

app.use(cookieParser());
app.use(
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

app.use(passport.initialize());
app.use(passport.session());

export { passport };
