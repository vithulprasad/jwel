module.exports = (sequelize, Sequelize) => {
  const ProductStoneAttributes = sequelize.define("ProductStoneAttributes", {
   
    ProductId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    AttributeId: {
      type: Sequelize.INTEGER,
    },
    StoneType: {
      type: Sequelize.STRING
    },
    Details: {
      type: Sequelize.STRING
    },
    TotalStone: {
      type: Sequelize.INTEGER
    },
    Weight: {
      type: Sequelize.DECIMAL
    },
    ActiveFlag: {
      type: Sequelize.BOOLEAN
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

  return ProductStoneAttributes;
};
