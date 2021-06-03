const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");

const { addUser, checkUser } = require("../helper/fileSystem");

const filePath = "./database/user.json";

// @route    POST api/user/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const user = {
          name,
          email,
          password: hash,
        };

        addUser(user);
        res.json({ msg: "User Created" });
      });
    });
  }
);

// @route    POST api/user/login
// @desc     Login user
// @access   Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    const userSearch = users.find((user) => user.email === email);
    console.log(userSearch);

    // user verify
    if (!userSearch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    // password verify
    bcrypt.compare(password, userSearch.password, function (err, result) {
      if (!result) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      res.send(`User Logged In: ${userSearch.name}`);
    });
  });
});

module.exports = router;
