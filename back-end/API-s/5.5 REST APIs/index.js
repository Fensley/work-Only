import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "d70e3095-88b4-4ba8-800a-3f01b0c1cf3b";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  console.log(req.body);
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const bodyData = req.body;
  const ps = await axios.post(API_URL + "/secrets", bodyData, config);
  try {
    res.render("index.ejs", { content: JSON.stringify(ps.data) });
  } catch (err) {
    res.status(404);
    res.render("index.ejs", { content: err.message });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;

  const update = await axios.put(
    `https://secrets-api.appbrewery.com/secrets/${searchId}`,
    req.body,
    config
  );
  console.log(update);
  try {
    res.render("index.ejs", {
      content: JSON.stringify(update.data),
    });
  } catch (err) {
    res.status(404);
    res.render("index.js", { content: err.message });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const patch = await axios.patch(
    `https://secrets-api.appbrewery.com/secrets/${searchId}`,
    req.body,
    config
  );
  console.log(patch.data);
  try {
    res.render("index.ejs", { content: JSON.stringify(patch.data) });
  } catch (err) {
    res.status(404);
    res.render("index.ejs", { content: err.message });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  const del = await axios.delete(
    `https://secrets-api.appbrewery.com/secrets/${searchId}`,
    config
  );
  console.log(del.data);
  try {
    res.render("index.ejs", {
      content: JSON.stringify(del.data),
    });
  } catch (err) {
    res.status(404);
    res.render("index.ejs", { content: err.message });
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
