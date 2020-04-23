const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const { twilioKeys } = require("../config/keys");

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

module.exports = (app) => {
  app.get("/twilio/token", (req, res) => {
    if (!req.user) return res.redirect("/auth/github");

    const chatGrant = new ChatGrant({
      ...twilioKeys.chat,
    });

    const token = new AccessToken(
      twilioKeys.twilioAccountSid,
      twilioKeys.twilioApiKey,
      twilioKeys.twilioApiSecret
    );

    token.addGrant(chatGrant);

    token.identity = req.user.githubID;
    res.send(token.toJwt());
  });
};
