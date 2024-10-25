import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/country", (req, res) => {
  const fullname = req.body["birthCountry"] + req.body["livecountry"];
  res.render("receive.ejs", { fullname });
  console.log(req.body);
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`port ${port} is listening`);
});
