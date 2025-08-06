const { verifyToken } = require("../utils/jwt.util");

exports.authentication = (req, res, next) => {
  if (req.headers.authorization) {
    let decode = verifyToken(req.headers.authorization);
    if (decode) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorize" });
    }
  } else {
    res.status(401).json({ message: "Unauthorize" });
  }
};
