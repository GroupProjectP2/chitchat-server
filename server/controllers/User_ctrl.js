const { hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class User_ctrl {
  static async register(req, res, next) {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;

      if (!fullName) {
        throw {
          status: 400,
          message: "Full name is required",
        };
      }

      if (!username) {
        throw {
          status: 400,
          message: "Username is required",
        };
      }

      if (!password) {
        throw {
          status: 400,
          message: "Password is required",
        };
      }

      if (password !== confirmPassword) {
        throw {
          status: 400,
          message: "Password and confirm password must be the same",
        };
      }

      if (!gender) {
        throw {
          status: 400,
          message: "Gender is required",
        };
      }

      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        throw {
          status: 400,
          message: "Username already exists",
        };
      }

      const hashedPassword = hashPassword(password);

      const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = await User.create({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyPic : girlPic,
      });

      const access_token = createToken({ id: newUser.id });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: {
          id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
          access_token,
        },
      });
    } catch (error) {
      console.log("🚀 ~ User_ctrl ~ register ~ error:", error);
    }
  }
}

module.exports = User_ctrl;
