import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";

const app = express();

// Middleware setup
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 2 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true })); // To parse form data

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
  // Save user ID in session
});

passport.deserializeUser((id, done) => {
  // Simulate fetching a user from a database
  if (id === 1) {
    done(null, { id: 1, username: "john_doe" });
  } else {
    done(new Error("User not found"));
  }
});

// Local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Replace with real database query
    if (username === "john_doe" && password === "123456") {
      return done(null, { id: 1, username: "john_doe" });
      // Successful login
    }
    return done(null, false, { message: "Invalid credentials" });
    // Login failed
  })
);

// Routes
app.get("/login", (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username">
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password">
      </div>
      <button type="submit">Login</button>
    </form>
  `);
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

app.get("/dashboard", (req, res) => {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.username}`);
  } else {
    res.redirect("/login");
  }
});

app.listen(1000, () => {
  console.log(`Server running on http://localhost:1000`);
});
