const express = require("express");
const app = express();

const cors = require("cors");

app.use("*", cors({ origin: "http://localhost:3000", credentials: true }));

const passport = require("passport");
require("./services/passport");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const { cookieKey } = require("./config/keys");
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    // in millisecond
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

require("./routes/authRoutes")(app);
require("./routes/twilioRoutes")(app);
require("./routes/apiRoutes")(app);

// For deployment setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
