const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 9090;
const start = "127.0.0.1";

// * Create a Node.js file that opens the requested file and returns the content to the client. If anything goes wrong, throw a 404 error:

const server = http.createServer((req, res) => {
  const F = url.parse(req.url, true);
  const file = "." + F.pathname;
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("404 Not Found");
    }
    res.writeHead(200, { "content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});
server.listen(port, start, () => {
  console.log(`server is runnig a ${start}:${port}/ & localhost${port}`);
});
