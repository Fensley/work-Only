import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// not in order
const db = new pg.Client({
  user: "postgres",
  host: "locsalhost",
  database: "WORLD-MAPPING",
  port: 3000,
  password: "0852",
});

console.log(db);

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", {
    total: "",
    countries: "",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
