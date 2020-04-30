const passport = require("passport");
const { User } = require("../services/db");

module.exports = (app) => {
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["read:user", "user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/handleLogin");
    }
  );

  app.get("/auth/current_user", async (req, res) => {
    if (!req.user) res.send("Not Logged In");
    else {
      const { dataValues } = await User.findByPk(req.user.username);
      res.send(dataValues);
    }
  });

  app.get("/auth/logout", async (req, res) => {
    req.logout();
    res.send("Logged Out");
  });
};
