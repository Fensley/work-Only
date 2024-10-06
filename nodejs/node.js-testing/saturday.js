const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello world N/O</h1>");
  return res.end();
});
server.listen(3000, (err) => {
  if (err) throw err;
  console.log("the server has been opened");
});
