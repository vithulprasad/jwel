module.exports = (sequelize, Sequelize) => {
  const Mentor = sequelize.define("mentor", {
    mentor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mentor_name: {
      type: Sequelize.STRING,
    },
    mentor_email: {
      type: Sequelize.STRING,
    },
    mentor_password: {
      type: Sequelize.STRING,
    },

    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return Mentor;
};
