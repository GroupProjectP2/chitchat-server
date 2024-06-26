const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class User_ctrl {
  //* ─── Register ────────────────────────────────────────────────────────
  static async register(req, res, next) {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;

      if (password !== confirmPassword) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Password and confirm password must be the same",
        };
      }

      const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = await User.create({
        fullName,
        username,
        password,
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
      next(error);
    }
  }

  //* ─── Login ───────────────────────────────────────────────────────────
  static async login(req, res, next) {
    try {
      console.log("🚀 ~ User_ctrl ~ login ~ password:", req.body);
      const { username, password } = req.body;
      console.log("🚀 ~ User_ctrl ~ login ~ username:", username);

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

      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw { name: "ValidationError" };
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw { name: "ValidationError" };
      }

      const access_token = createToken({ id: user.id });

      res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ User_ctrl ~ login ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Data User ───────────────────────────────────────────────────
  static async getDataUser(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(200).json({
        user,
      });
    } catch (error) {
      console.log("🚀 ~ User_ctrl ~ getDataUser ~ error:", error);
      next(error);
    }
  }
}

module.exports = User_ctrl;
