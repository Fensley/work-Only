import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
env.config();
const port = 4000;
const app = express();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "SECRET",
  password: "0852",
  port: "3000",
});
db.connect();

// async function NewFunction() {
//   const data = await db.query("SELECT * FROM users");
//   console.log(data.rows);
// }
// NewFunction();

app.use(bodyParser.urlencoded({ extended: false }));

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

// post routes
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;
  try {
    const data = await db.query("SELECT * FROM userstwo WHERE email=$1", [
      email,
    ]);
    const results = data.rows[0];
    if (results) {
      console.log(results);
      res.render("success.ejs");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("error with the database", error);
    // res.redirect("/");
  }
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;
  console.log(`user: ${email} `, `password: ${password}`);
  res.render("success.ejs");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("app is open");
});
