const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

/* // Cliente
socket.on("mi mensaje", (data) => {
    alert(data);
    socket.emit("notificacion", "Mensaje recibido exitosamente");
}); */

// Cliente
const enviarMensaje = () => {
  const mensaje = document.getElementById("mensaje").value;
  if (mensaje) {
    socket.emit("mensaje", mensaje);
  }
};

socket.on("mensajes", (data) => {
  if (data.length === 0) return;
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<p>socketid: ${data[i]["socketid"]} -> mensaje: ${data[i]["mensaje"]}</p>`;
  }

  console.log(html);
  document.getElementById("mensajes").innerHTML = html;
});
