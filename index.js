const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDb = require("./model/connectDB");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);

const Login = require("./routes/Login.routes");
const Register = require("./routes/Register.routes");
const Dashboard = require("./routes/Dashboard.routes");
const Logout = require("./routes/logout.routes");
const Todo = require("./routes/todo.routes");

const store = new mongoSession({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

/***
 * Middleware
 */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/login", Login);
app.use("/register", Register);
app.use("/dashboard", Dashboard);
app.use("/logout", Logout);
app.use("/todo", Todo);
/**
 * Routes
 */

app.get("/", (req, res) => {
  res.render("home");
});

(async () => {
  app.listen(PORT, (err) => {
    connectDb(process.env.MONGODB_URI);
    const result = err
      ? `Server does not listen due to error: ${err}`
      : `Server started on port http://localhost:${PORT}`;
    console.log(result);
  });
})();
