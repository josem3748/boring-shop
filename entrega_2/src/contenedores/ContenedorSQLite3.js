// Clase Contenedor

class ContenedorSQLite3 {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }
  async saveProduct(Object) {
    try {
      Object.timestamp = Date.now();

      const resultado = this.connection
        .from(this.table)
        .insert(Object)
        .then((data) => {
          console.log(`Registro agregado con id ${data[0]}`);
          Object.id = data[0];
          return Object;
        });
      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async saveCart(Array) {
    try {
      let Object = {};
      Object.timestamp = Date.now();
      Object.productos = JSON.stringify(Array);

      const resultado = this.connection
        .from(this.table)
        .insert(Object)
        .then((data) => {
          console.log(`Registro agregado con id ${data[0]}`);
          Object.id = data[0];
          //Object.productos = JSON.parse(Object.productos);
          return Object.id;
        });
      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async editById(id, Object) {
    try {
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", id)
        .update(Object)
        .then((data) => {
          console.log("SQLite3 conectada");
          if (data == 0) return { error: "registro no encontrado" };

          return this.connection
            .from(this.table)
            .select("*")
            .where("id", "=", id)
            .then((data) => {
              return data;
            });
        });
      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async saveById(id, Object) {
    try {
      let Array;
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", id)
        .then((data) => {
          console.log("SQLite3 conectada");
          if (data == 0) return { error: "registro no encontrado" };

          Array = JSON.parse(data[0]["productos"]);
          Array.push(Object);
          Array = JSON.stringify(Array);

          return this.connection
            .from(this.table)
            .select("*")
            .where("id", "=", id)
            .update({ productos: Array })
            .then((data) => {
              return this.connection
                .from(this.table)
                .select("*")
                .where("id", "=", id)
                .then((data) => {
                  console.log(`Registro con id ${id} editado.`);
                  return data;
                });
            });
        });

      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async getById(Number) {
    try {
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", Number)
        .then((data) => {
          console.log("SQLite3 conectada");

          if (data.length == 0) return { error: "registro no encontrado" };

          let keys = Object.keys(data[0]);
          for (let i = 0; i < data.length; i++) {
            keys.forEach((key) => {
              try {
                data[i][key] = JSON.parse(data[i][key]);
              } catch (e) {
                data[i][key] = data[i][key];
              }
            });
          }

          data[0]["productos"]
            ? (data = data[0]["productos"])
            : (data = data[0]);

          return data;
        });
      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .then((data) => {
          console.log("SQLite3 conectada");
          let keys = Object.keys(data[0]);
          for (let i = 0; i < data.length; i++) {
            keys.forEach((key) => {
              try {
                data[i][key] = JSON.parse(data[i][key]);
              } catch (e) {
                data[i][key] = data[i][key];
              }
            });
          }
          return data;
        });
      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(Number) {
    try {
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", Number)
        .then((data) => {
          if (data.length == 0) return { error: "registro no encontrado" };

          let keys = Object.keys(data[0]);
          for (let i = 0; i < data.length; i++) {
            keys.forEach((key) => {
              try {
                data[i][key] = JSON.parse(data[i][key]);
              } catch (e) {
                data[i][key] = data[i][key];
              }
            });
          }
          return data;
        });

      this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", Number)
        .del()
        .then((data) => {
          console.log("SQLite3 conectada");
          if (data != 0) {
            console.log(`Registro con ID ${Number} eliminado.`);
          }
        });

      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      let Array;
      const resultado = this.connection
        .from(this.table)
        .select("*")
        .where("id", "=", id)
        .then((data) => {
          console.log("SQLite3 conectada");
          if (data == 0) return { error: "registro no encontrado" };

          Array = JSON.parse(data[0]["productos"]);

          let check = Array.find((elem) => elem.id === parseInt(id_prod));

          if (!check) return { error: "registro no encontrado" };

          let nuevoArray = Array.filter(
            (elem) => elem.id !== parseInt(id_prod)
          );

          nuevoArray = JSON.stringify(nuevoArray);

          return this.connection
            .from(this.table)
            .select("*")
            .where("id", "=", id)
            .update({ productos: nuevoArray })
            .then((data) => {
              return this.connection
                .from(this.table)
                .select("*")
                .where("id", "=", id)
                .then((data) => {
                  console.log(`Registro con id ${id} editado.`);
                  return data;
                });
            });
        });

      return resultado.then();
    } catch (error) {
      console.log(error);
    }
  }
}

export { ContenedorSQLite3 };
