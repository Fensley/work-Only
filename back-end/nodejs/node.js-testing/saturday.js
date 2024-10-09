const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const events = require("events");

const server = http.createServer((req, res) => {
  if (req.url === "/upload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("please submit a file!");
      }
      const oldpath = file.upload[0].filepath;
      const newpath =
        "/Users/fensleyrene/Desktop/" + file.upload[0].originalFilename;

      fs.rename(oldpath, newpath, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("Error with file name system");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("File is successful named!");
        return res.end();
      });
    });
  } else {
    fs.readFile("./rene.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("server is opening");
});
