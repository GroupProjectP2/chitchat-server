const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, secret);
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};
