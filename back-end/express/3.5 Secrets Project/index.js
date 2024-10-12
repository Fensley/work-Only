//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirnameIndex = import.meta.dirname + "/public/index.html";
const __dirnameSecret = import.meta.dirname + "/public/secret.html";
let pass = "";
let __URL = "";

app.use(bodyParser.urlencoded({ extended: true }));

function passer(req, res, next) {
  pass = req.body["password"];
  __URL = req.url;
  next();
}
app.use(passer);

app.get("/", (req, res) => {
  res.sendFile(__dirnameIndex);
});

app.post("/check", (req, res) => {
  const id = req.body["password"];
  if (id === "ILoveProgramming") {
    res.sendFile(__dirnameSecret);
  } else {
    res.sendFile(__dirnameIndex);
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is listening on port ${port}`);
});
