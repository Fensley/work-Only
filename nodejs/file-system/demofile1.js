// read File
const http = require("http");
const fs = require("fs");

const serVer = http.createServer((req, res) => {
  fs.readFile("demofile1.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

serVer.listen(9090, () => {
  console.log("the server has been loaded on localhost:900");
});

//create Files
