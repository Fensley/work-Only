import express from "express";
import bodyParser from "body-parser";
// import fileURLToPath from "url";
// import { dirname } from "path";

const app = express();
const port = 3000;
let bandName = "";
const path = import.meta.dirname + "/public/index.html";
console.log(path);

app.use(bodyParser.urlencoded({ extended: true }));

function passer(req, res, next) {
  bandName = req.body["street"] + req.body["pet"];
  next();
}
app.use(passer);

app.get("/", (req, res) => {
  res.sendFile(path);
});

app.post("/submit", (req, res) => {
  // console.log(req.body, req.method);
  const band = req.body.street + req.body.pet;
  res.write("<h1>Your band generator name is:</h1>");
  res.write(`<h3>${bandName}</h3>`);
  return res.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
