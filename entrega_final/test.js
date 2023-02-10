import supertest from "supertest";
import chai from "chai";
import { describe } from "mocha";

const request = supertest("http://localhost:8080");
const expect = chai.expect;

const getTokken = async () => {
  let response = await request.post("/apilogin").send({
    username: "jose",
    password: "123",
  });

  const tokken = response._body.tokken;
  return tokken;
};

describe("test api rest full PRODUCTOS", () => {
  before(() => {
    console.log(
      "/=================== Inicio TOTAL del testeo ===================/"
    );
  });

  //   beforeEach(() => {
  //     console.log(
  //       "/=================== Inicio de nuevo testeo ===================/"
  //     );
  //   });

  describe("productosGetAll", () => {
    it("debería ser un array mayor a 0", async () => {
      const response = await request
        .get("/api/productos")
        .set("tokken", await getTokken());
      expect(response.body.length).to.gt(0);
    });
  });

  describe("productosGetId", () => {
    it("debería tener propiedad nombre", async () => {
      const response = await request
        .get("/api/productos/2")
        .set("tokken", await getTokken());
      expect(response.body).include.keys("timestamp");
    });
  });

  describe("productosPost", () => {
    it("debería crear un nuevo producto de nombre test", async () => {
      const response = await request
        .post("/api/productos")
        .send({
          nombre: "test",
          descripcion: "...bla bla bla...",
          categorias: ["escuadras"],
          codigo: 9896,
          precio: 345.67,
          stock: 1,
          timestamp: 1519211809934,
          foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-50.png",
        })
        .set("tokken", await getTokken());
      expect(response.body.nombre).to.eql("test");
    });
  });

  describe("productosPut", () => {
    it("debería pasar el nombre de test a test2", async () => {
      const firstResponse = await request
        .get("/api/productos")
        .set("tokken", await getTokken());
      const registroTest = firstResponse.body.find(
        (elem) => elem.nombre === "test"
      );
      const idTest = registroTest.id;

      const response = await request
        .put(`/api/productos/${idTest}`)
        .send({
          nombre: "test2",
        })
        .set("tokken", await getTokken());
      expect(response.body.nombre).to.eql("test2");
    });
  });

  describe("productosDelete", () => {
    it("debería no poder encontrar el producto test2", async () => {
      const firstResponse = await request
        .get("/api/productos")
        .set("tokken", await getTokken());
      const registroTest = firstResponse.body.find(
        (elem) => elem.nombre === "test2"
      );
      const idTest = registroTest.id;

      const secondResponse = await request
        .delete(`/api/productos/${idTest}`)
        .set("tokken", await getTokken());
      const finalResponse = await request
        .get(`/api/productos/${secondResponse.body.id}`)
        .set("tokken", await getTokken());

      expect(finalResponse.body.error).to.eql("registro no encontrado");
    });
  });

  //   afterEach(() => {
  //     console.log("/=================== Fin de testeo ===================/");
  //   });

  after(() => {
    console.log(
      "/=================== Fin TOTAL del testeo ===================/"
    );
  });
});
