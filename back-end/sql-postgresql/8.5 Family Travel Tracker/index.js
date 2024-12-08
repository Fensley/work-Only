import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world-data",
  password: "0852",
  port: 3000,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT code FROM country_ivisited");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  // addUsers();
  res.render("index.ejs", {
    countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
app.post("/deleteall", async (req, res) => {
  const deleteAll = await db.query("DELETE FROM country_ivisited");
  console.log(deleteAll.rowCount);
  res.redirect("/");
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countrytwo WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    // console.log("add console", result.rows);
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("INSERT INTO country_ivisited (code) VALUES ($1)", [
        countryCode,
      ]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  // console.log(req.body);
  if (req.body.add) {
    res.render("new.ejs");
    console.log(req.body.add);
  } else {
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const body = req.body;
  console.log(body);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
console.log(users);
