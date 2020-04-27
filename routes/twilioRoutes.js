// All routes using twilio api go here
const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const { twilioKeys } = require("../config/keys");
const twilioClient = require("twilio")(
  twilioKeys.accountSid,
  twilioKeys.authToken
);

const { Channel, Op, UserChannel } = require("../services/db");

module.exports = (app) => {
  app.get("/twilio/token", (req, res) => {
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

  app.post("/api/channels/create", async (req, res) => {
    console.log(req.user.username);
    console.log(req.body);

    const channel = await twilioClient.chat
      .services(twilioKeys.chat.serviceSid)
      .channels.create({
        friendlyName: "general",
        uniqueName: `${req.user.username}~${req.body.repoName}~general`,
        createdBy: req.user.username,
      });

    await twilioClient.chat
      .services(twilioKeys.chat.serviceSid)
      .channels(`${req.user.username}~${req.body.repoName}~general`)
      .members.create({ identity: req.user.username });

    await Channel.create({
      channelName: `${req.user.username}~${req.body.repoName}~general`,
    });

    await UserChannel.create({
      username: req.user.username,
      channelName: `${req.user.username}~${req.body.repoName}~general`,
    });

    console.log(channel);
    res.json(channel);
  });

  app.post("/api/channels/delete", async (req, res) => {
    if (req.user.username !== req.body.channelName.split("~")[0]) {
      return res.send("Not allowed");
    }

    const channel = await twilioClient.chat
      .services(twilioKeys.chat.serviceSid)
      .channels(req.body.channelName)
      .remove();

    if (channel) {
      await Channel.destroy({
        where: {
          channelName: req.body.channelName,
        },
      });
    }

    res.send(channel);
  });
};
