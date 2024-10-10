import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

// body-parser middleware
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("<p>Success!</p>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

console.log(fileURLToPath(import.meta.url));
