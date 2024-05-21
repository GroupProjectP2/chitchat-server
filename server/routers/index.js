"use strict";
const express = require("express");
const User_ctrl = require("../controllers/User_ctrl");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Server is running...");
});

router.post("/register", User_ctrl.register);
router.post("/login");

router.get("/messages/:id");
router.post("/messages/:id");

router.get("/users");

module.exports = router;
