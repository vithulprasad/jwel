module.exports = (sequelize, Sequelize) => {
  const School = sequelize.define("schools", {
    school_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school_name: {
      type: Sequelize.STRING,
    },
    school_type: {
      type: Sequelize.STRING,
    },
    school_number: {
      type: Sequelize.STRING,
    },
    school_address: {
      type: Sequelize.STRING,
    },

    principal_name: {
      type: Sequelize.STRING,
    },
    principal_email: {
      type: Sequelize.STRING,
    },
    principal_phone_number: {
      type: Sequelize.STRING,
    },
    vice_name: {
      type: Sequelize.STRING,
    },
    vice_email: {
      type: Sequelize.STRING,
    },
    vice_phone_number: {
      type: Sequelize.STRING,
    },
    school_status: {
      type: Sequelize.ENUM,
      values: ["active", "inactive"],
      defaultValue: "active",
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return School;
};
