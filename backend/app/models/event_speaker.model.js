const Speaker = require("./speaker.model");
const Event = require("./event.model");

module.exports = (sequelize, Sequelize) => {
  const EventSpeaker = sequelize.define("event_speakers", {
    event_speaker_id: {
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
    speaker_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Speaker,
        key: "speaker_id",
      },
    },
  });

  return EventSpeaker;
};
