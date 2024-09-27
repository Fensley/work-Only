var http = require("http");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    if (req.url == "/toupload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("nah nah");
        }
        console.log(files);
        console.log(fields);
        var oldpath = files.toupload[0].filepath;
        var newpath =
          "/Users/fensleyrene/Desktop/" + files.toupload[0].originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write("File uploaded and moved!");
          res.end();
        });
      });
    } else {
      fs.readFile("./form.html", (err, data) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write("<p>errorr</p>");
          return res.end();
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(2003, () => {
    console.log("server is running");
  });
