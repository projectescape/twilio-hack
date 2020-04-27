// All routes using twilio api go here
const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const { twilioKeys } = require("../config/keys");
const twilioClient = require("twilio")(
  twilioKeys.accountSid,
  twilioKeys.authToken
);

module.exports = (app) => {
  app.get("/twilio/token", (req, res) => {
    if (!req.user) return res.redirect("/auth/github");

    const chatGrant = new ChatGrant({
      ...twilioKeys.chat,
    });

    const token = new AccessToken(
      twilioKeys.accountSid,
      twilioKeys.apiKey,
      twilioKeys.apiSecret
    );

    token.addGrant(chatGrant);

    token.identity = req.user.username;
    res.send(token.toJwt());
  });

  app.get("/twilio/allChannels", async (req, res) => {
    const data = await twilioClient.chat
      .services("IS03f0f1d30c5943aca2539a2f6832e245")
      .channels.list();
    res.send(data);
  });
};
