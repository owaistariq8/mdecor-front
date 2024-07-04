const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // if (err) return res.sendStatus(403).send('Invalid token.');
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
  
}

module.exports = authenticateToken;