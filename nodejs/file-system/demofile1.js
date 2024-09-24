// * the file system module have :

// * .Read files
// * .create files
// * .Update files
// * .Delete files
// * .Rename files

// * read File
const http = require("http");
const fs = require("fs");
const { error } = require("console");

// const serVer = http.createServer((req, res) => {
//   fs.readFile("demofile1.html", (err, data) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(data);
//     return res.end();
//   });
// });

// serVer.listen(9090, () => {
//   console.log("the server has been loaded on localhost:900");
// });

// * create Files
// the file system module has methods for creating new file :

// . fs.appendFile()
// . fs.open()
// . fs.writeFile()

// * fs.writeFile()
// fs.appendFile(
//   "mynewfile1.txt",
//   "fensley rene jus created a new file called mynewfile1",
//   (err) => {
//     if (err) throw err;
//     console.log("the file has been saved!");
//   }
// );

//* fs.open()
// fs.open("first.html", "w", (err, file) => {
//   if (err) throw err;
//   console.log(file);
// });

// *fswriteFile();
// first create a new file and and if exist then replace the data
// fs.writeFile("thirdfile.txt", "hello word 2", (err) => {
//   if (err) throw err;
//   console.log("a new file has been saved");
// });

//--
//--

// * UPDATE FILES
// the file system module has methods update file :
// * . fs.appendFile()
// * . fs.writeFile()
// similar to the up just update file and content.

//
//
// * DELETE FILES
fs.unlink("thirdfile.txt", (err) => {
  if (err) throw err;
  console.log("deleted");
});

// * rename
fs.rename("filename", "newname", (err) => {
  if (err) throw err;
});
