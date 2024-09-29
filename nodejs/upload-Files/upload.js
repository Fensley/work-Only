const fs = require("fs");
const http = require("http");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
  if (req.url === "/toupload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      console.log(files);
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("error while passing the file");
      }
      const old = files.toupload[0].filepath;
      const current =
        "/Users/Fensleyrene/Desktop/" + files.toupload[0].originalFilename;
      fs.rename(old, current, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("error in file rename");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end("file has been rename successful");
      });
    });
  } else {
    fs.readFile("./form.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      //   console.log(req);
      return res.end();
    });
  }
});
server.listen(2003, (err) => {
  if (err) throw err;
  console.log("the server has been opened");
});
