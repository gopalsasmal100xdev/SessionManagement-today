const express = require("express");
const Router = express.Router();
const isAuth = require("../controllers/isAuth");

Router.route("/")
  .get(isAuth, (req, res) => {
    res.render("dashboard");
  })
  .post((req, res) => {});

module.exports = Router;
