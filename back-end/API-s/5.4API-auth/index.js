import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "fensley";
const yourPassword = "lovefensley";
const yourAPIKey = "04f87b07-6b60-40bd-82d9-6247408c00f6";
const yourBearerToken = "d70e3095-88b4-4ba8-800a-3f01b0c1cf3b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}random`);
  console.log(response);
  const noA = response.data;
  try {
    res.render("index.ejs", { content: JSON.stringify(noA) });
  } catch (err) {
    res.status(404).send(err.message);
    // res.render("index.ejs", { content: err.message });
  }
});

app.get("/basicAuth", async (req, res) => {
  // https://stackoverflow.com/a/74632908

  const basic = await axios.get(
    `https://secrets-api.appbrewery.com/all?page=2`,
    {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    }
  );
  const bSic = basic.data;
  console.log(basic);
  try {
    res.render("index.ejs", { content: JSON.stringify(bSic) });
  } catch (err) {
    console.err(err);
    res.status(404).send(err.message);
    // res.render("index.ejs", { content: err.message });
  }
});

app.get("/apiKey", async (req, res) => {
  const forApiKey = await axios.get(
    `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
  );
  const dataApikey = forApiKey.data;
  console.log(dataApikey);
  try {
    res.render("index.ejs", { content: JSON.stringify(dataApikey) });
  } catch (err) {
    res.status(404).send(err.message);
    // res.render("index.ejs", { content: err.message });
  }
});

app.get("/bearerToken", async (req, res) => {
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402

  const myToken = await axios.get(
    "https://secrets-api.appbrewery.com/secrets/42",
    {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    }
  );
  const getMytoken = myToken.data;
  try {
    res.render("index.ejs", { content: JSON.stringify(getMytoken) });
  } catch (err) {
    res.status(404).send(err.message);
    // res.render("index.ejs", { content: err.message });
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
