const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const events = require("events");
const server = http.createServer((req, res) => {
  fs.readFile("./rene.html", (err, data) => {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});
server.listen(3000, (err) => {
  if (err) throw err;
  console.log("server is opening");
});
