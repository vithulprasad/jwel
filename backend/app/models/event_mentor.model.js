// models/eventMentor.model.js
const Mentor = require("./mentor.model");
const Event = require("./event.model");

module.exports = (sequelize, Sequelize) => {
  const EventMentor = sequelize.define("event_mentors", {
    event_mentor_id: {
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
    mentor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
    },
  });

  return EventMentor;
};
