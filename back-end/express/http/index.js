import express from "express";
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("<p>testing out</p>");
});
app.listen(port, () => {
  console.log(`server is running on port${port}`);
});
