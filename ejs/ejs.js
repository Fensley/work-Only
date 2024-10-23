import express from "express";
const app = express();
const port = 3000;

let typeday = "";
let typefun = "";

app.get("/", (req, res) => {
  let today = new Date().getDay();
  if (today === 0 || today === 6) {
    typeday = "weekend";
    typefun = "have fun";
  } else {
    typeday = "weekday";
    typefun = "work hard";
  }

  res.render("index.ejs", {
    daytype: typeday,
    adv: typefun,
  });
});

//
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`the server is listening on port ${port} `);
});
