const Event = require("./event.model");
const Student = require("./student.model");
const event_parties = require("./event_party.model");

module.exports = (sequelize, Sequelize) => {
  const EventParticipants = sequelize.define("event_participants", {
    id: {
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
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "student_id",
      },
    },
    status: {
      type: Sequelize.ENUM("applied", "rejected", "accepted"),
      allowNull: false,
    },
    party_post: {
      type: Sequelize.ENUM("member", "VP", "President"),
      allowNull: true,
    },
    party_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: event_parties,
        key: "event_party_id",
      },
    },
  });

  return EventParticipants;
};
