import express from "express";
const app = express();
const port = 3000;

let weekday = "";
let weekend = "";

const date = new Date().getDay();
console.log(date);

if (date > 4) {
  weekday = "yes";
} else {
  weekend = "no";
}
app.get("/", (req, res) => {
  res.render("index.ejs", { name: weekday });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`the server is listening on port ${port} `);
});
