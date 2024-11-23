import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "WORLD-MAPPING",
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
  res.render("index.ejs", {
    countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
  console.log("home console", countries);
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countrytwo WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    console.log("add console", result.rows);
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
app.post("/user", async (req, res) => {});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on http://localhost:${port}`);
});
