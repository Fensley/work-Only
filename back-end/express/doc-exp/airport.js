import express from "express";
import bodyParser from "body-parser";
const __filename = import.meta.dirname + "/index.html";
console.log(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__filename);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const fullid = req.body["firstname"] + req.body["lastname"];
  res.send(`<p>your full name is: ${fullid}  </p>`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server open on port ${port}`);
});
