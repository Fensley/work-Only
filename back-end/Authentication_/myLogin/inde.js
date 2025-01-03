import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

env.config();
const port = 4000;
const app = express();
const saltRound = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "SECRET",
  password: "0852",
  port: "3000",
});
db.connect();

// Serialize and Deserialize Users
passport.serializeUser((user, done) => {
  if (!user.id) {
    return done(new Error("User ID is missing"));
  }
  done(null, user.id);
  // Ensure the user object has a valid `id` field
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM userstwo WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return done(new Error("User not found"));
    }
    done(null, result.rows[0]);
    // Pass the user object
  } catch (error) {
    done(error);
  }
});

app.use(
  session({
    secret: "NOTASECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      domain: "localhost",
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

// Set View Engine
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.post("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const data = await db.query("SELECT * FROM userstwo WHERE email=$1", [
        username,
      ]);

      if (!data.rows[0]) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      const isValid = await bcrypt.compare(password, data.rows[0].password);

      if (!isValid) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      console.log("User found:", data.rows[0]);
      // Verify user object
      return cb(null, data.rows[0]);
      // Pass the user object with `id`
    } catch (error) {
      return cb(error);
    }
  })
);

// POST Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/login");
      // Redirect if authentication fails
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.render("success.ejs", { user });
    });
  })(req, res, next);
});

app.post("/signup", async (req, res, next) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const existData = await db.query("SELECT * FROM userstwo WHERE email=$1", [
      email,
    ]);

    if (existData.rows.length > 0) {
      return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const result = await db.query(
      `INSERT INTO userstwo (email, password) VALUES ($1, $2) RETURNING *`,
      [email, hashedPassword]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log("Error logging in after sign-up", err);
          return next(err);
        }

        // Redirect to a success page or home page
        res.render("success.ejs", { user });
      });
    } else {
      res.redirect("/signup");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.redirect("/signup");
  }
});

// Start Server
app.listen(port, (err) => {
  if (err) throw err;
  console.log("App is running on port", port);
});
// note make sure i get the the user first name and last name country etc. and add it to the database
