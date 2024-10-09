const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
  if (req.url == "/toupload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, field, files) => {
      const old = files.toupload[0].filepath;
      const newfile =
        "/Users/fensleyrene/Desktop/" + files.toupload[0].originalFilename;
      console.log(old, newfile);
      fs.rename(old, newfile, (err) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "text.html" });
          res.end("not not uploaded");
        }
        res.writeHead(200, { "Content-Type": "text.html" });
        res.write("File uploaded and moved!");
        return res.end();
      });
    });
  } else {
    fs.readFile("./form.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(3000, () => console.log("server is running on port 3000"));
