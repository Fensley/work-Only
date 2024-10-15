import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const __dirname = import.meta.dirname + "/index.html";

app.use(bodyParser.urlencoded({ extended: true }));

app.all();

app.get("/", (req, res) => {
  res.sendFile(__dirname);
});

app.post("/submit", (req, res) => {
  res.write(
    `<P>your name is : ${req.body["firstname"]} ${req.body["lastname"]} </P>`
  );
  return res.end();
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`the server is listening on port ${port}`);
});
