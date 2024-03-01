// models/eventSchool.model.js
const School = require("./school.model");
const Event = require("./event.model");
module.exports = (sequelize, Sequelize) => {
  const EventSchool = sequelize.define("event_schools", {
    event_school_id: {
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
    school_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: School,
        key: "school_id",
      },
    },
  });

  return EventSchool;
};
