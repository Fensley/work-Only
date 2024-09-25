const http = require("http");
const url = require("url");
const fs = require("fs");
// import uc from "upper-case";
// * Three Modules together
const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const fileName = "." + q.pathname;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});
server.listen(2003, (err) => {
  if (err) throw err;
  console.log(123);
});
