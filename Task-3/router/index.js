const express = require("express");
const router = express.Router();
const User = require("../controller/user.controller");

router.use("/user", User);

module.exports = router;
