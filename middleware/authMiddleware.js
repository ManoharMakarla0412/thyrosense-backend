const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  console.log("Token received:", token); // Log the token for debugging

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Split to get the token after 'Bearer'
    req.user = decoded;  // Store the decoded token (user data) in the request object
    next();  // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token', error: error.message });
  }
};
