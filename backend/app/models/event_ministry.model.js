const Ministry = require("./ministry.model");
const Event = require("./event.model");

module.exports = (sequelize, Sequelize) => {
  const EventMinistry = sequelize.define("event_ministries", {
    event_ministry_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "event_id",
      },
    },
    ministry_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Ministry,
        key: "ministry_id",
      },
    },
  });

  return EventMinistry;
};
