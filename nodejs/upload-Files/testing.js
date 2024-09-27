const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
  if (req.url == "toupload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {});
  }
});
