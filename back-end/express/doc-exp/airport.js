// edit
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __file = import.meta.dirname + "/index.html";

app.use(bodyParser.urlencoded({ extended: true }));

let fullname = "";

function paser(req, res, next) {
  fullname = req.body["firstname"] + " " + req.body["lastname"];
  next();
}

app.use(paser);

app.get("/", (req, res) => {
  res.sendFile(__file);
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your name is: ${fullname}</h1>`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("the server has been open");
});
console.log(fullname);
