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
    school_phone_number: {
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
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return School;
};
