const http = require("http");
const nodemailer = require("nodemailer");
const youremail = "DONTRYATHOME";
const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: youremail,
    pass: youremail,
  },
});

const mailOptions = {
  from: youremail,
  to: youremail,
  subject: "test 1233",
  text: "testing two",
};
const server = http.createServer((req, res) => {
  if (req.url === "/testing") {
    transpoter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log(info);
    });
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Email is send successfully! @ fensley");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Please type end end of the url to proceed");
  }
});

server.listen(2003, (err) => {
  if (err) throw err;
  console.log("the server went success!");
});
