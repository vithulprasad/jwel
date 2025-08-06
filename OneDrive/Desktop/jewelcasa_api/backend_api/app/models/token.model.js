module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    token: {
      type: Sequelize.STRING
    },
    expiry: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  });

  return Token;
};
