import jwt from "jsonwebtoken";
const PRIVATE_KEY = "myprivatekey";

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const auth = (req, res, next) => {
  let authHeader = req.session.accesstokken;
  if (!authHeader) authHeader = req.headers.tokken;

  if (!authHeader) {
    return res.status(401).json({
      error: "not authenticated - login at /apilogin",
    });
  }

  const token = authHeader;

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "expired - login at /apilogin",
      });
    }

    if (decoded.data.username !== "jose" && decoded.data.password !== "123") {
      return res.status(403).json({
        error: "not authorized - login at /apilogin",
      });
    }

    next();
  });
};

export { generateToken, auth };
