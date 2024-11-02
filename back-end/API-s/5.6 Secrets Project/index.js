import axios from "axios";
import express from "express";
const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const secret = await axios.get("https://secrets-api.appbrewery.com/random");
  const random = secret.data;
  console.log(random);
  try {
    res.render("index.ejs", { secret: random.secret, user: random.username });
  } catch (err) {
    console.error(err.message);
    res.render("index.ejs", {
      secret: "there is an error while fetching",
      user: iamerror,
    });
  }
});

app.listen(port, () => {
  console.log(`server has opened on port ${port}`);
});
