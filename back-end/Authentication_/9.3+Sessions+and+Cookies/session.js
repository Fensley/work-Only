import express from "express";
import session from "express-session";
const port = 1000;
const app = express();

app.use(
  session({
    secret: "fensley",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 9000000 },
  })
);

app.get("/", (req, res) => {
  req.session.user = { username: "rene" };
  res.send("user Login");
});

app.get("/get", (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    res.send(`welcome ${req.session.user.username}`);
  } else {
    res.send("please login first");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out.");
    }
    res.send("User logged out!");
  });
});

app.listen(port, () => {
  console.log(`the server running on ${port}`);
});
