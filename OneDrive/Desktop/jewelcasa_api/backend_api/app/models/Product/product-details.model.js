module.exports = (sequelize, Sequelize) => {
  const ProductDetails = sequelize.define("ProductDetails", {
    ProductDetailId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: {
      type: Sequelize.INTEGER,
    },
    ProductDetailType: {
      type: Sequelize.STRING
    },
    DetailData: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    },
    CreatedDate: {
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

  return ProductDetails;
};
