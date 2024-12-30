import express from "express";
const port = 4000;
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("app is open");
});
