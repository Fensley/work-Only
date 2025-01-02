import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";

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

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

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
      if (results.email === email && results.password === password) {
        console.log(results);
        res.render("success.ejs");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/signup");
    }
  } catch (error) {
    console.error("error with the database", error);
    res.redirect("/");
  }
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;
  const existData = await db.query("SELECT * FROM userstwo");
  const resultsData = existData.rows;
  console.log(resultsData);
  const checkIfexist = resultsData.some((data) => data.email === email);
  if (checkIfexist) {
    res.redirect("/login");
  } else {
    try {
      const data = await db.query(
        `INSERT INTO userstwo values ($1,$2) RETURNING *`,
        [email, password]
      );
      const returnData = data.rows;
      console.log(returnData);
      if (returnData) {
        res.render("success.ejs");
      } else {
        res.redirect("/signup");
      }
    } catch (error) {
      console.error(err);
    }
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("app is open");
});
