import express from "express";
const port = 4000;
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  //   res.("testing");
  res.render("login.ejs");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("app is open");
});
