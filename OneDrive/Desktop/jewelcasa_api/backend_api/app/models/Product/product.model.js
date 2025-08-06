module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("Products", {
    ProductId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    VendorInstanceId: {
      type: Sequelize.INTEGER,
    },
    SKU: {
      type: Sequelize.STRING
    },
    Name: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.TEXT
    },
    ProductMaterialTypeId: {
      type: Sequelize.INTEGER
    },
    Weight: {
      type: Sequelize.DECIMAL
    },
    Wasteage: {
      type: Sequelize.DECIMAL
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

  return Products;
};
