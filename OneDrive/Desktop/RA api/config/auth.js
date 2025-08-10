const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, authenticate };