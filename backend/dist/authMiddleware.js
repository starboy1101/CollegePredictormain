const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Failed to authenticate token'
      });
    }
    req.user = decoded; // Attach user information to request
    next(); // Proceed to the next middleware or route handler
  });
};
module.exports = authenticateToken; // Use ES6 export syntax