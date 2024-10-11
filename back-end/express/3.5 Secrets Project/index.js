//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`To see how the final website should work, run "node solution.js".
Make sure you have installed all the dependencies with "npm i".
The password is ILoveProgramming`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is listening on port ${port}`);
});
