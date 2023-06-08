const express = require("express");
const Router = express.Router();
const User = require("../model/User");

Router.route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.redirect("/login");
      } else {
        const user = new User({ name, email, password });
        user
          .save()
          .then(() => {
            console.log("Data saved successfully");
            res.redirect("/login");
          })
          .catch(() => {
            res.redirect("/register");
          });
      }
    } catch (err) {
      res.redirect("/register");
    }
  });

module.exports = Router;
