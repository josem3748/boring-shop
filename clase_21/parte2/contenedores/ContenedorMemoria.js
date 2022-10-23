class ContenedorMemoria {
  constructor() {
    this.objetosMock = [];
  }

  guardar(Object) {
    this.objetosMock.push(Object);
    return Object;
  }
  listarAll() {
    return this.objetosMock;
  }
  listar(id) {
    let elemento = this.objetosMock.find((elem) => elem.id == id);
    if (!elemento)
      return {
        message: "El id no existe",
      };
    return elemento;
  }
  actualizar(Object) {
    let elemento = this.objetosMock.find((elem) => elem.id == Object.id);
    if (!elemento)
      return {
        message: "El id no existe",
      };

    Object.nombre && (elemento.nombre = Object.nombre);
    Object.email && (elemento.email = Object.email);
    Object.website && (elemento.website = Object.website);
    Object.image && (elemento.image = Object.image);

    this.objetosMock = this.objetosMock.filter((elem) => elem.id != Object.id);
    this.objetosMock.push(elemento);
    return elemento;
  }
  borrar(id) {
    let elemento = this.objetosMock.find((elem) => elem.id == id);
    if (!elemento)
      return {
        message: "El id no existe",
      };

    this.objetosMock = this.objetosMock.filter((elem) => elem.id != id);
    return elemento;
  }
}

export default ContenedorMemoria;
