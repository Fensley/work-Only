import express from "express";

const app = express();
const port = 3000;
// custom middlewares
const logger = (req, res, next) => {
  console.log(req.url, req.method);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});