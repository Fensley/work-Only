import cookieParser from "cookie-parser";
import express from "express";

const app = express();
const port = 1000;

// Add the cookie-parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("username", "john_doe", {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.send("Cookie is set!");
});

app.get("/get", (req, res) => {
  console.log(req.cookies);
  const username = req.cookies.username;
  res.send(`Cookie value: ${username || "Not set"}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
