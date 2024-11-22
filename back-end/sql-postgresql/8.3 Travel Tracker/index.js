import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  database: "WORLD-MAPPING",
  port: 3000,
  password: "0852",
  host: "localhost",
});
db.connect();

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

async function checkVisisted() {
  try {
    const result = await db.query("SELECT code FROM country_ivisited");
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.code);
    });
    return countries;
  } catch (err) {
    console.error("Error fetching visited countries:", err);
    return [];
  }
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  try {
    const input = req.body["country"];
    console.log(input);

    const result = await db.query(
      "SELECT country_code FROM countrytwo WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    console.log(result.rows);

    if (result.rows.length !== 0) {
      const data = result.rows[0];
      const countryCode = data.country_code;

      await db.query("INSERT INTO country_ivisited (code) VALUES ($1)", [
        countryCode,
      ]);
    }
    res.redirect("/");
  } catch (err) {
    console.error("Error adding country:", err);
    res.status(500).send("An error occurred while adding the country.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
