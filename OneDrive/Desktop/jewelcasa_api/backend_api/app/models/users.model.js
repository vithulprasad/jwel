module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    role_type: {
      type: Sequelize.ENUM,
      values: ['AUTHOR', 'EDITOR'],
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Active', 'Inactive'],
      defaultValue:"Inactive"
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  });

  return Users;
};
