class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    console.log(`El nombre de usuario es ${this.nombre} ${this.apellido}`);
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    console.log(this.mascotas.length);
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
    console.log(soloLibros);
  }
}

const usuario = new Usuario(
  "José",
  "Moreno",
  [{ nombre: "Libro", autor: "Juanma" }],
  ["perro", "gato"]
);

usuario.getFullName();
usuario.addMascota("Pez");
usuario.countMascotas();
usuario.addBook("Lingo", "Pietro");
usuario.getBookNames();
