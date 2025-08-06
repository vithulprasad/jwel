module.exports = (sequelize, Sequelize) => {
  const ProductDetailTypes = sequelize.define("ProductDetailTypes", {
    DetailTypeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DetailType: {
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

  return ProductDetailTypes;
};
