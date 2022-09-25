const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

const addMessage = (e) => {
  const mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };
  socket.emit("mensaje", mensaje);
  return false;
};

socket.on("mensajes", (data) => {
  const html = data
    .map((elem, index) => {
      return `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`;
    })
    .join(" ");

  document.getElementById("mensajes").innerHTML = html;
});
