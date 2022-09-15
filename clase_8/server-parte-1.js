const express = require("express");

const app = express();

const { json } = express;

app.use(json());
app.use("/uploads", express.static(__dirname + "/public"));

const { Router } = express;

const router = Router();

app.use((req, res, next) => {
  console.log("middleware");
  next();
});

const middle = (req, res, next) => {
  console.log("middleware 2");
  next();
};

app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Hola mundo!" });
});

app.use("/api/usuarios", router);

//////////////////////////////////// usuarios ////////////////////////////////////
router.get("/", middle, (req, res) => {
  res.status(200).json({ mensaje: "get usuarios" });
});

router.post("/", (req, res) => {
  res.status(200).json({ mensaje: "post usuarios" });
});
//////////////////////////////////// usuarios ////////////////////////////////////

const server = app.listen(4000, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
