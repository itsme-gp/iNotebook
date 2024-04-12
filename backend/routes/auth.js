const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//creatre user using post "/api/auth" . auth not required
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Pass must be atleast 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Please enter unique value in email" });
      });
  }
);

module.exports = router;
