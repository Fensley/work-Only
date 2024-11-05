import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const getAPI = await axios.get(`https://ziptasticapi.com/${req.body.code}`);
  const APIresponce = getAPI.data;
  console.log(APIresponce);
  try {
    res.render("index.ejs", { data: APIresponce, err: APIresponce.error });
  } catch (err) {
    console.error("this is an error ", err);
    res.render("index.ejs", { APIerror: err.error });
  }
});

app.post("/redirect", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
