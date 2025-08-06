module.exports = (sequelize, Sequelize) => {
  const MediaTypes = sequelize.define("MediaTypes", {
    MediaTypeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    MediaType: {
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

  return MediaTypes;
};
