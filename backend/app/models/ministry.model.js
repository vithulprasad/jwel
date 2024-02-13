module.exports = (sequelize, Sequelize) => {
  const Ministry = sequelize.define("ministry", {
    ministry_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ministry_name: {
      type: Sequelize.STRING,
    },

    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return Ministry;
};
