const http = require("http");
const nodemailer = require("nodemailer");

// Create transporter object using the SMTP transport protocol
const transporter = nodemailer.createTransport({
  service: "gmail",
  // You can use other services (like Outlook, Yahoo, etc.)
  auth: {
    user: "your-email@gmail.com",
    // Your email address
    pass: "your-email-password",
    // Your email password (be careful with exposing this)
  },
});

// Send email function
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: to, // Receiver's email
    subject: subject,
    text: text,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Create a server to send email when accessed
const server = http.createServer((req, res) => {
  if (req.url === "/sendemail") {
    sendEmail(
      "recipient-email@example.com",
      "Test Subject",
      "Hello, this is a test email!"
    );
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Email sent successfully!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
