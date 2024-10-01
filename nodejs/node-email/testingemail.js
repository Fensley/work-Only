const http = require("http");
const nodemail = require("nodemailer");

const email = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: "fortilusnehemie@gmail.com",
    pass: "passtesting",
  },
});

const mailoption = {
  from: "notfound@gmail.com",
  to: "notfoundtwo@gmail.com",
  subject: "About the tech",
  text: "Hi we are launching a new techologie",
};

const server = http.createServer((req, res) => {
  if (req.url === "/send") {
    email.sendMail(mailoption, (err, info) => {
      if (err) throw err;
      console.log(info);
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Success!</h1>");
    return res.end();
  } else {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write("please add the /end of the url point");
    return res.end();
  }
});
server.listen(3000, (err) => {
  if (err) throw err;
  console.log("Success!");
});
