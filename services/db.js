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
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  photo: {
    type: Sequelize.TEXT,
  },
});

const Channel = sequelize.define("channel", {
  channelName: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

const UserChannel = sequelize.define("userchannel", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  channelName: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

UserChannel.belongsTo(User, {
  foreignKey: "username",
  targetKey: "username",
  as: "user",
  onDelete: "cascade",
  onUpdate: "cascade",
});
UserChannel.belongsTo(Channel, {
  foreignKey: "channelName",
  targetKey: "channelName",
  as: "channel",
  onDelete: "cascade",
  onUpdate: "cascade",
});

User.belongsToMany(Channel, {
  through: UserChannel,
  foreignKey: "username",
  onDelete: "cascade",
  onUpdate: "cascade",
});
Channel.belongsToMany(User, {
  through: UserChannel,
  foreignKey: "channelName",
  onDelete: "cascade",
  onUpdate: "cascade",
});

// sequelize.sync({ force: true });
sequelize.sync({});

module.exports = {
  User,
  Channel,
  UserChannel,
  Op: Sequelize.Op,
  literal: Sequelize.literal,
};
