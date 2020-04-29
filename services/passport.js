const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const keys = require("../config/keys");
const { User } = require("./db");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async ({ username, accessToken }, done) => {
  done(null, { username, accessToken });
});

passport.use(
  new GithubStrategy(
    {
      ...keys.github,
      callbackURL: "/auth/github/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      await User.findOrCreate({
        where: { username: profile.username },
        defaults: {
          displayName: profile.displayName,

          photo: profile.photos[0].value,
        },
      });
      done(null, { username: profile.username, accessToken });
    }
  )
);
