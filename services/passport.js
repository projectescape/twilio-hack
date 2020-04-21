const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const keys = require("../config/keys");
const { User } = require("./db");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async ({ githubID }, done) => {
  done(null, { githubID });
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
        where: { githubID: profile.id },
        defaults: {
          displayName: profile.displayName,
          username: profile.username,
          photo: profile.photos[0].value,
        },
      });
      done(null, { githubID: profile.id });
    }
  )
);
