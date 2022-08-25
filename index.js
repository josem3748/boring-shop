// Desafío: Clases

class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `El nombre de usuario es ${this.nombre} ${this.apellido}`;
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }
  getBookNames() {
    const soloLibros = this.libros.map((item) => {
      return item.nombre;
    });
    return soloLibros;
  }
}

const usuario = new Usuario(
  "José",
  "Moreno",
  [{ nombre: "Libro", autor: "Juanma" }],
  ["perro", "gato"]
);

console.log(usuario.getFullName());
usuario.addMascota("Pez");
console.log(usuario.countMascotas());
usuario.addBook("Lingo", "Pietro");
console.log(usuario.getBookNames());
