module.exports = (sequelize, Sequelize) => {
  const ProductMaterialTypes = sequelize.define("ProductMaterialTypes", {
    MaterialTypeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    MaterialType: {
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

  return ProductMaterialTypes;
};
