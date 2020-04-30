// All routes not using twilio api go here
const axios = require("axios");
const { Channel, Op, UserChannel, literal } = require("../services/db");
const githubApiUrl = "https://api.github.com";

module.exports = (app) => {
  // Current user's Github info
  app.get("/api/github/user", async (req, res) => {
    const { data } = await axios.get(`${githubApiUrl}/user`, {
      headers: {
        Authorization: `token ${req.user.accessToken}`,
      },
    });
    res.send(data);
  });
  // Current user's All repos
  app.get("/api/repos", async (req, res) => {
    const { data } = await axios.get(
      `${githubApiUrl}/users/${req.user.username}/repos`,
      {
        headers: {
          Authorization: `token ${req.user.accessToken}`,
        },
      }
    );
    const repos = data.map((repo) => {
      return repo.name;
    });
    res.send(repos);
  });

  // Get content of a directory of repo
  // Temporarily post to avoid setting params on get request
  app.post("/api/repos/content/", async (req, res) => {
    const { data } = await axios.get(
      `${githubApiUrl}/repos/${req.body.owner}/${req.body.repoName}/contents${req.body.path}`,
      {
        headers: {
          Authorization: `token ${req.user.accessToken}`,
        },
      }
    );
    res.send(
      data.map((file) => {
        return {
          name: file.name,
          path: file.path,
          type: file.type,
        };
      })
    );
  });

  // Current user's created channels
  app.get("/api/channels/created", async (req, res) => {
    let data = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.like]: `${req.user.username}~%~general`,
        },
      },
      order: [["channelName", "ASC"]],
    });

    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // Current user's repos for which channel hasn't been created
  app.get("/api/channels/notcreated", async (req, res) => {
    let allRepos = await axios.get(
      `${githubApiUrl}/users/${req.user.username}/repos`,
      {
        headers: {
          Authorization: `token ${req.user.accessToken}`,
        },
      }
    );
    allRepos = allRepos.data.map((repo) => {
      return repo.name;
    });

    let subscribedRepos = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.like]: `${req.user.username}~%~general`,
        },
      },
      order: [["channelName", "ASC"]],
    });
    subscribedRepos = subscribedRepos.map(
      (repo) => repo.dataValues.channelName
    );

    let i = 0;

    allRepos = allRepos.filter((repo) => {
      if (i >= subscribedRepos.length) return true;
      if (subscribedRepos[i].split("~")[1] === repo) {
        i++;
        return false;
      }
      return true;
    });

    res.send(allRepos);
  });

  // All General Channels created
  app.get("/api/channels/general/all", async (req, res) => {
    let data = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.like]: "%~%~general",
        },
      },
      order: [["channelName", "ASC"]],
    });

    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // All general channels Subscribed including self
  app.get("/api/channels/subscribed/all", async (req, res) => {
    let data = await UserChannel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.like]: "%~%~general",
        },
        username: req.user.username,
      },
      order: [["channelName", "ASC"]],
    });
    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // All general channels Subscribed excluding self
  app.get("/api/channels/subscribed", async (req, res) => {
    let data = await UserChannel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.and]: {
            [Op.like]: "%~%~general",
            [Op.notLike]: `${req.user.username}~%`,
          },
        },
        username: req.user.username,
      },
      order: [["channelName", "ASC"]],
    });
    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // All general channels Not Subscribed
  app.get("/api/channels/nonsubscribed", async (req, res) => {
    let data = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.and]: {
            [Op.like]: "%~%~general",
            [Op.notIn]: literal(
              `(select uc."channelName" from "userchannels" uc where uc.username = '${req.user.username}' and uc."channelName" like '%~%~general' )`
            ),
          },
        },
      },
      order: [["channelName", "ASC"]],
    });
    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // All general channels Not Subscribed with search
  app.get("/api/channels/nonsubscribed/search/:key", async (req, res) => {
    let data = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.and]: {
            [Op.like]: `%${req.params.key}%~general`,
            [Op.notIn]: literal(
              `(select uc."channelName" from "userchannels" uc where uc.username = '${req.user.username}' and uc."channelName" like '%~%~general' )`
            ),
          },
        },
      },
      order: [["channelName", "ASC"]],
    });
    data = data.map((repo) => repo.dataValues.channelName);

    res.json(data);
  });

  // All subchannels for a particular repo subscribed
  app.get("/api/subchannels/subscribed/:owner/:repo", async (req, res) => {
    let data = await UserChannel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.and]: {
            [Op.like]: `${req.params.owner}~${req.params.repo}~%`,
            [Op.notLike]: `${req.params.owner}~${req.params.repo}~general`,
          },
        },
        username: req.user.username,
      },
      order: [["channelName", "ASC"]],
    });

    data = data.map((channel) => channel.dataValues.channelName);

    res.json(data);
  });

  // All subchannels for a particular not subscribed
  app.get("/api/subchannels/nonsubscribed/:owner/:repo", async (req, res) => {
    let data = await Channel.findAll({
      attributes: ["channelName"],
      where: {
        channelName: {
          [Op.and]: {
            [Op.like]: `${req.params.owner}~${req.params.repo}~%`,
            [Op.notIn]: literal(
              `(select uc."channelName" from "userchannels" uc where uc.username = '${req.user.username}' )`
            ),
          },
        },
      },
      order: [["channelName", "ASC"]],
    });

    data = data.map((channel) => channel.dataValues.channelName);

    res.json(data);
  });
};
