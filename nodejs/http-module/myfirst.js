const dt = require("./myfirstmodule");
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Tye": "text/plain" });
    res.end(`today is ${dt.mydate().getDate()} and ${req.url}`);
  })
  .listen(8080, () => {
    console.log("the server has created");
  });
