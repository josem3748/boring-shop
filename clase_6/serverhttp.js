const http = require("http");
const moment = require("moment");

const server = http.createServer((req, res) => {
  const hora = parseInt(moment().format("LT"));
  let mensaje;
  if (hora >= 6 && hora < 12) {
    mensaje = "Buenos días";
  } else if (hora >= 12 && hora < 19) {
    mensaje = "Buenas tardes";
  } else {
    mensaje = "Buenas noches";
  }

  //console.log(req);
  res.end(`<h1>${mensaje}</h1>`);
});

const port = 8080;

const connectServer = server.listen(port, () => {
  console.log(
    `Servidor corriendo en el puerto ${connectServer.address().port}`
  );
});
