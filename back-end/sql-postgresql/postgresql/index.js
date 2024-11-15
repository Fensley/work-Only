import Client from "pg";
const db = new Client({
  user: "fenslry",
  host: "localhost",
  database: "mydataBase",
  password: "notrealfensley",
  port: "1111",
});
db.connect();
db.query("SELECT * FROM user", (err, res) => {
  if (err) {
    console.error("error executing query", err.stack);
  } else {
    console.log("User data:", res.row);
  }
  db.end();
});
