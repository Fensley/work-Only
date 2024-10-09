const http = require("http");
const fs = require("fs");
const url = require("url");
const nodemail = require("nodemailer");
const formidable = require("formidable");
const events = require("events");

const port = 3000;

// * fs ..

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

// * events

const eventhandle = (name) => {
  console.log(`welcome ${name}`);
};
const event = new events.EventEmitter();
event.on("1999", eventhandle);
event.emit("1999", "Fensley");

// * file upload

const fileServer = http.createServer((req, res) => {
  if (req.url === "/upload" && req.method.toLowerCase() === "post") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        // Log the error for debugging
        console.error("Formidable Error:", err);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("Error in the form system: " + err.message); // Add error message
        return res.end();
      }

      const uploadedFile = files.upload ? files.upload[0] : null;

      if (!uploadedFile || uploadedFile.size === 0) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Please upload a file!");
      } else {
        const oldpath = uploadedFile.filepath;
        const newpath =
          `/Users/fensleyrene/Desktop/` + uploadedFile.originalFilename;

        fs.rename(oldpath, newpath, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Problem on file saving system!");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("File saved successfully!");
            return res.end();
          }
        });
      }
    });
  } else {
    fs.readFile("./rene.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});

fileServer.listen(port, (err) => {
  if (err) throw err;
  console.log(`the server is opening on port ${port}`);
});

// *  nodemail

const email = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: "@gmail.com",
    pass: "Nottody",
  },
});
const mailoption = {
  from: "@gmail",
  to: "@gmail",
  subject: "blabla",
  text: "lorem20",
};
email.sendMail(mailoption, (err, info) => {
  console.log("mail is sending");
});
