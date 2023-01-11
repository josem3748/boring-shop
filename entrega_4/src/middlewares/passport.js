import express from "express";
const app = express();

import { connectionMongoDb as connection } from "../config.js";

import cookieParser from "cookie-parser";
import session from "express-session";
app.use(cookieParser());

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import * as dao from "../daos/index.js";
const usuarios = new dao.usuariosDao();

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    connection();

    usuarios.model.findOne({ username }, (err, user) => {
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

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      connection();

      usuarios.model.findOne({ username: username }, async (err, user) => {
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
        usuarios.model.create(newUser, (err, userWithId) => {
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

          (async () => {
            try {
              const info = await transporter.sendMail(mailOptions);
              loggerConsole.info(info);
            } catch (error) {
              loggerConsole.error(error);
              loggerFile.error(error);
            }
          })();

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
  usuarios.model.findById(id, done);
});

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
