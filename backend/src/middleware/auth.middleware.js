const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedJWT = jwt.verify(token, JWT_SECRET);

    req.userId = decodedJWT.id;

    next();
  } catch (error) {
    res.status(401).json({
      message: "UnAuthorized",
    });
  }
};

module.exports = protect;
