module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("events", {
    event_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: Sequelize.STRING,
    },
    event_start_date: {
      type: Sequelize.DATE,
    },
    event_start_time: {
      type: Sequelize.TIME, 
    },
    event_end_date: {
      type: Sequelize.DATE,
    },
    event_end_time: {
      type: Sequelize.TIME,
    },
    event_cover_image: {
      type: Sequelize.STRING,
    },
    event_type: {
      type: Sequelize.STRING,
    },
    event_description: {
      type: Sequelize.STRING,
    },
    event_method: {
      type: Sequelize.ENUM,
      values: ["open", "closed"],
      defaultValue: "open",
    },
    event_venue: {
      type: Sequelize.STRING,
    },
    event_orientation_date: {
      type: Sequelize.DATE,
    },
    event_age_restriction: {
      type: Sequelize.INTEGER,
    },
    // event_status: {
    //   type: Sequelize.ENUM,
    //   values: ["draft", "published"],
    // },

    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return Event;
};
