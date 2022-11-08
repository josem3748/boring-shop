import jwt from "jsonwebtoken";
const PRIVATE_KEY = "myprivatekey";

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "1m" });
  return token;
};

// REGISTER
app.post("/register", (req, res) => {
  const { nombre, password, direccion } = req.body;

  const yaExiste = usuarios.find((usuario) => usuario.nombre == nombre);
  if (yaExiste) {
    return res.json({ error: "ya existe ese usuario" });
  }

  const usuario = { nombre, password, direccion };

  usuarios.push(usuario);

  const access_token = generateToken(usuario);

  res.json({ access_token });
});

// LOGIN
app.post("/login", (req, res) => {
  const { nombre, password } = req.body;

  const usuario = usuarios.find(
    (u) => u.nombre == nombre && u.password == password
  );
  if (!usuario) {
    return res.json({ error: "credenciales invalidas" });
  }

  const access_token = generateToken(usuario);

  res.json({ access_token });
});

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "not authorized",
      });
    }

    req.user = decoded.data;
    next();
  });
};
