const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

module.exports = Authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    const token = access_token.split(" ")[1];
    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
