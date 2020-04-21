const Sequelize = require("sequelize");
const { DATABASE_URL } = require("../config/keys");

const sequelize = new Sequelize(DATABASE_URL, {
  define: {
    timestamps: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("user", {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  githubID: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  photo: {
    type: Sequelize.TEXT,
  },
});

sequelize.sync();

module.exports = { User };
