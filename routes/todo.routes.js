const express = require("express");
const Router = express.Router();
const isAuth = require("../controllers/isAuth");
const User = require("../model/User");

Router.route("/")
  .get(isAuth, async (req, res) => {
    try {
      const { email } = req.session.user;
      const user = await User.findOne({ email });
      res.render("todo", { todos: user.todos });
    } catch (err) {
      res.redirect("todo/add");
    }
  })
  .post(isAuth, (req, res) => {});

Router.route("/add")
  .get(isAuth, (req, res) => {
    res.render("addTodo");
  })
  .post(isAuth, async (req, res) => {
    const { title } = req.body;
    const { email } = req.session.user;
    const user = await User.findOne({ email });
    const { todos } = user;
    todos.push({ title });
    user.todos = todos;
    await user.save();
    res.redirect("/todo");
  });

module.exports = Router;
