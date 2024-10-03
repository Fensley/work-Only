const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const path = "C:/Users/Owner/Desktop/Work only/nodejs/node.js-testing/";

const server = http.createServer((req, res) => {
  if (req.url === "/upload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, field, file) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("there was an error with the file system");
      }
      console.log(file);
      const oldfile = file.upload[0].filepath;
      const newfile = path + file.upload[0].originalFilename;
      fs.rename(oldfile, newfile, (err) => {
        if (err) {
          res.writeHead(400, { "Content-type": "text/html" });
          res.end("there was an error rename the file!");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("file rename success!");
        return res.end();
      });
    });
  } else {
    fs.readFile("./rene.html", (err, data) => {
      if (err) {
        res.write(404, { "Content-Type": "text/html" });
        res.end("404 page not found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});
server.listen(2003, () => {
  console.log("server is opened");
});
