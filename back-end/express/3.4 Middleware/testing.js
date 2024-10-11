import express from "express";
import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirnametwo = dirname(fileURLToPath(import.meta.url));

const __dirname = import.meta.dirname + "/public/index.html";

const app = express();
const port = 3000;
// let band = "";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
function passer(req, res, next) {
  const street = req.body["street"];
  const pet = req.body["pet"];
  req.band = street + pet;
  next();
}
app.use(passer);

app.get("/", (req, res) => {
  res.sendFile(__dirname);
});
app.post("/submit", (req, res) => {
  //   console.log(req);
  res.send(`<p>your band name is <h3>${req.band}</h3> </p>`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is listen on port ${port}`);
});
