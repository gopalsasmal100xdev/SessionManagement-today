const express = require("express");
const User = require("../model/User");

const Router = express.Router();
Router.route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user.password === password) {
        req.session.isAuth = true;
        req.session.user = { email };
        res.redirect("/dashboard");
      } else {
        res.redirect("/login");
      }
    } catch (error) {}
  });

module.exports = Router;
