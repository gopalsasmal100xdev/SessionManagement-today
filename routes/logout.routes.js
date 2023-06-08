const express = require("express");
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/");
    });
  })
  .post((req, res) => {});

module.exports = Router;
