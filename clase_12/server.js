const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//...
// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static("public"));
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
// El servidor funcionando en el puerto 8080
httpServer.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

const mensajes = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" },
];

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");

  // Envio los mensajes al cliente que se conectó
  socket.emit("mensajes", mensajes);

  // Escucho los mensajes enviados por el cliente y se los propago a todos
  socket.on("mensaje", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});
