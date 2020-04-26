const axios = require("axios");
const { Repo, Op } = require("../services/db");
const githubApiUrl = "https://api.github.com";

// Write a Middleware for login
module.exports = (app) => {
  app.get("/api/myRepos", async (req, res) => {
    const { data } = await axios.get(
      `${githubApiUrl}/users/${req.user.username}/repos`
    );
    const repos = data.map((repo) => {
      return repo.name;
    });
    res.send(repos);
  });

  app.get("/api/myReposSubscribed", async (req, res) => {
    let data = await Repo.findAll({
      attributes: ["name"],
      where: {
        name: {
          [Op.like]: `${req.user.username}#%#general`,
        },
      },
      order: [["name", "ASC"]],
    });

    data = data.map((repo) => repo.dataValues.name);

    console.log(data);

    res.json(data);
  });

  app.get("/api/myReposNonSubscribed", async (req, res) => {
    let allRepos = await axios.get(
      `${githubApiUrl}/users/${req.user.username}/repos`
    );
    allRepos = allRepos.data.map((repo) => {
      return repo.name;
    });

    let subscribedRepos = await Repo.findAll({
      attributes: ["name"],
      where: {
        name: {
          [Op.like]: `${req.user.username}#%#general`,
        },
      },
      order: [["name", "ASC"]],
    });
    subscribedRepos = subscribedRepos.map((repo) => repo.dataValues.name);

    let i = 0;

    allRepos = allRepos.filter((repo) => {
      if (i >= subscribedRepos.length) return true;
      if (subscribedRepos[i].split("#")[1] === repo) {
        i++;
        return false;
      }
      return true;
    });

    res.send(allRepos);
  });
};
