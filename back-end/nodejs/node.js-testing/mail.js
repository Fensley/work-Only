const http = require("http");
const nodemailer = require("nodemailer");
const password = "ddsdddsdddnf";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fsdsfsde@gmail.com",
    pass: password,
  },
});
const mailoption = {
  from: "ffafasffdfe@gmail.com",
  to: "zsdsdde@gmail.com",
  subject: "yessss plan for next week",
  Text: "yes drill baby drill",
};

transporter.sendMail(mailoption, (err) => {
  console.log("message send");
});
