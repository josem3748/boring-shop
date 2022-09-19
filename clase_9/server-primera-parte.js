const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Hola mundo!" });
});

const server = app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
