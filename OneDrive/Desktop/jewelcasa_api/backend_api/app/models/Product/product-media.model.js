module.exports = (sequelize, Sequelize) => {
  const ProductMedias = sequelize.define("ProductMedias", {
    ProductMediaId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: {
      type: Sequelize.INTEGER,
    },
    MediaTypeId: {
      type: Sequelize.INTEGER
    },
    StorageLocation: {
      type: Sequelize.JSON
    },
    Description: {
      type: Sequelize.TEXT
    },
   
  });

  return ProductMedias;
};
