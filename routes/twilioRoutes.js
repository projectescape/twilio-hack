// All routes using twilio api go here
const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const SyncGrant = AccessToken.SyncGrant;
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

    const syncGrant = new SyncGrant({
      ...twilioKeys.sync,
    });

    const token = new AccessToken(
      twilioKeys.accountSid,
      twilioKeys.apiKey,
      twilioKeys.apiSecret
    );

    token.addGrant(chatGrant);
    token.addGrant(syncGrant);

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

    await twilioClient.sync
      .services(twilioKeys.sync.serviceSid)
      .documents.create({
        uniqueName: `${req.user.username}~${req.body.repoName}~general~snippet`,
        data: { value: "" },
      });
    await twilioClient.sync
      .services(twilioKeys.sync.serviceSid)
      .documents.create({
        uniqueName: `${req.user.username}~${req.body.repoName}~general~checklist`,
        data: { items: [] },
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
      .channels(req.body.channelName.replace(/\//g, "~"))
      .remove();

    await twilioClient.sync
      .services(twilioKeys.sync.serviceSid)
      .documents(`${req.body.channelName.replace(/\//g, "~")}~snippet`)
      .remove();
    await twilioClient.sync
      .services(twilioKeys.sync.serviceSid)
      .documents(`${req.body.channelName.replace(/\//g, "~")}~checklist`)
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

  app.post("/api/channels/join", async (req, res) => {
    const data = await twilioClient.chat
      .services(twilioKeys.chat.serviceSid)
      .channels(req.body.channelName.replace(/\//g, "~"))
      .members.create({ identity: req.user.username });

    await UserChannel.create({
      username: req.user.username,
      channelName: req.body.channelName,
    });

    res.send(data);
  });

  app.post("/api/channels/leave", async (req, res) => {
    const data = await twilioClient.chat
      .services(twilioKeys.chat.serviceSid)
      .channels(req.body.channelName.replace(/\//g, "~"))
      .members(req.user.username)
      .remove();

    await UserChannel.destroy({
      where: {
        username: req.user.username,
        channelName: req.body.channelName,
      },
    });

    res.send(data);
  });

  app.post("/api/subchannels/create", async (req, res) => {
    const [dat, created] = await Channel.findOrCreate({
      where: {
        channelName: `${req.user.username}~${req.body.repoName}~${req.body.path}`,
      },
    });
    console.log("created ", created);
    if (created) {
      await twilioClient.chat
        .services(twilioKeys.chat.serviceSid)
        .channels.create({
          friendlyName: req.body.path,
          uniqueName: `${req.user.username}~${
            req.body.repoName
          }~${req.body.path.replace(/\//g, "~")}`,
          createdBy: req.user.username,
        });

      await twilioClient.chat
        .services(twilioKeys.chat.serviceSid)
        .channels(
          `${req.user.username}~${req.body.repoName}~${req.body.path.replace(
            /\//g,
            "~"
          )}`
        )
        .members.create({ identity: req.user.username });

      await twilioClient.sync
        .services(twilioKeys.sync.serviceSid)
        .documents.create({
          uniqueName: `${req.user.username}~${
            req.body.repoName
          }~${req.body.path.replace(/\//g, "~")}~snippet`,
          data: { value: "" },
        });
      await twilioClient.sync
        .services(twilioKeys.sync.serviceSid)
        .documents.create({
          uniqueName: `${req.user.username}~${
            req.body.repoName
          }~${req.body.path.replace(/\//g, "~")}~checklist`,
          data: { items: [] },
        });

      await UserChannel.create({
        username: req.user.username,
        channelName: `${req.user.username}~${req.body.repoName}~${req.body.path}`,
      });
    }
    res.json(created);
  });
};
