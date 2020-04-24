const axios = require("axios");

const githubApiUrl = "https://api.github.com";

module.exports = (app) => {
  app.get("/api/selfRepos", async (req, res) => {
    const { data } = await axios.get(
      `${githubApiUrl}/users/${req.user.username}/repos`
    );
    res.send(data);
  });
};
