"use strict";
const express = require("express");
const User_ctrl = require("../controllers/User_ctrl");
const authentication = require("../middlewares/authentication");
const Message_ctrl = require("../controllers/Messages_ctrl");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Server is running...");
});

router.post("/register", User_ctrl.register);
router.post("/login", User_ctrl.login);

router.use(authentication);
router.post("/messages/:id", Message_ctrl.sendMessage);
router.get("/messages/:id", Message_ctrl.getMessage);

router.get("/users", User_ctrl.getDataUser);

module.exports = router;
