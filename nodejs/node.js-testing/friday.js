const http = require("http");
const fs = require("fs");
const url = require("url");
const link = "https://www.w3schools.com/nodejs/default.asp";

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  const fileone = query.path;
  const filetwo = "." + query.path;
  if (req.url === fileone) {
    console.log(fileone, filetwo);
    fs.readFile(filetwo, (err, data) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "text.html" });
        res.write("error in url file");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    fs.readFile("./text.txt", (err, datatwo) => {
      if (err) {
        console.log("err, reading the error file!");
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write(datatwo);
      return res.end();
    });
  }
});
server.listen(3000);
