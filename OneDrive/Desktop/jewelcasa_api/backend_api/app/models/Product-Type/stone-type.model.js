module.exports = (sequelize, Sequelize) => {
  const StoneTypes = sequelize.define("StoneTypes", {
    StoneTypeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    StoneType: {
      type: Sequelize.STRING,
    },
    ActiveFlag: {
      type: Sequelize.BOOLEAN
    },
    Description: {
      type: Sequelize.STRING
    },
    CreationDate: {
      type: Sequelize.DATE
    },
    ChangedDate: {
      type: Sequelize.DATE
    },
    CreatedBy: {
      type: Sequelize.STRING
    },
    ChangedBy: {
      type: Sequelize.STRING
    },
  });

  return StoneTypes;
};
