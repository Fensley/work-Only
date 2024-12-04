import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  database: "SECRET",
  port: 3000,
  password: "0852",
});
db.connect();
// console.log(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const enter = req.body;
  // console.log(password);

  const insertINTO = await db.query(
    "INSERT INTO users VALUES($1,$2) RETURNING *",
    [email, password]
  );
  console.log(insertINTO);
  const allData = await db.query("SELECT * FROM users");
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const enter = req.body;
  const allData = await db.query("SELECT * FROM users");

  const exit = allData.rows.some(
    (each) => each.email === email && each.password == password
  );
  if (exit) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
  // console.log(exit);
  // console.log(allData.rows);
  // console.log(enter);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${port}`);
});
