// models/eventSchool.model.js
const Event = require("./event.model");
module.exports = (sequelize, Sequelize) => {
  const EventParty = sequelize.define("event_parties", {
    event_party_id: {
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
    event_party_name: {
      type: Sequelize.STRING,
    },
    event_party_tagline: {
      type: Sequelize.STRING,
    },
  });

  return EventParty;
};
