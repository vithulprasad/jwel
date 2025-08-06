const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./users.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
db.Products = require("./Product/product.model.js")(sequelize, Sequelize);
db.ProductDetails = require("./Product/product-details.model.js")(sequelize, Sequelize);
db.ProductStoneAttributes = require("./Product/product-stone-attribute.model.js")(sequelize, Sequelize);
db.ProductMedias = require("./Product/product-media.model.js")(sequelize, Sequelize);
db.MediaTypes = require("./Product-Type/media-type.model.js")(sequelize, Sequelize);
db.ProductMaterialTypes = require("./Product-Type/product-material-type.model.js")(sequelize, Sequelize);
db.StoneTypes = require("./Product-Type/stone-type.model.js")(sequelize, Sequelize);
db.ProductDetailTypes = require("./Product-Type/product-detail-type.model.js")(sequelize, Sequelize);


module.exports = db;
