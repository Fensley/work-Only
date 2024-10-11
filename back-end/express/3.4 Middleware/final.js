import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;
console.log(__dirname);

let email = "";
let pass = "";
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

function passer(req, res, next) {
  email = req.body["email"];
  pass = req.body["password"];
  next();
}
app.use(passer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/final.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.write("<h1>Welcome</h1>");
  res.write(`<p>${email}</p>`);
  res.write(`<p>${pass}</p>`);
  res.write(`<h3>thanks you</h3>`);
  return res.end();
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`app listening on port ${port}`);
});
