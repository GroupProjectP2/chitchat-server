"use strict";
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Server is running...");
});

router.post("/register");
router.post("/login");

router.get("/messages/:id");
router.post("/messages/:id");

router.get("/users");

module.exports = router;
