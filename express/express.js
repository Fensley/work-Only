const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
app.get("/", (req, res) => {
  res.send("file saved");
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("app has open");
});
