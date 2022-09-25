const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const contenedor = require("./contenedor.js");
let archivoMensajes = new contenedor.Contenedor("./data/mensajes.txt");

/////////////////////////////////////////////////////////////////////
/////////////////////Obteniendo productos////////////////////////////
/////////////////////////////////////////////////////////////////////

const getProducts = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const respuesta = await fetch(
    "https://jmdigitalconsulting.com/productos.txt",
    requestOptions
  )
    .then((response) => response.text())
    //.then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return JSON.parse(respuesta);
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const hbs = require("express-handlebars");

app.set("view engine", "hbs"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.get("/", async (req, res) => {
  const productos = await getProducts();
  const check = productos.length > 0;
  const mensajesCheck = await archivoMensajes.getAll();
  const check2 = mensajesCheck.length > 0;
  res.status(200).render("main", {
    body: check,
    body2: check2,
  });
});

const server = httpServer.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});

io.on("connection", async (socket) => {
  const productos = await getProducts();
  const mensajes = await archivoMensajes.getAll();

  console.log("¡Nuevo cliente conectado!");

  // Envio los productos al cliente que se conectó
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  // Escucho los productos enviados por el cliente y se los propago a todos
  socket.on("producto", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
  socket.on("mensaje", async (data) => {
    //mensajes.push(data);
    await archivoMensajes.save(data);
    const mensajes = await archivoMensajes.getAll();
    io.sockets.emit("mensajes", mensajes);
  });
});
