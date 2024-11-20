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

app.get("/", async (req, res) => {
  let countries = [];
  const result = await db.query("SELECT * FROM country_ivisited");
  console.log(result.rows);

  result.rows.forEach((each) => {
    countries.push(each.code);
  });

  res.render("index.ejs", {
    total: countries.length,
    countries,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
