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
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.modules = require("./module.model.js")(sequelize, Sequelize);
db.events = require("./event.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.schools = require("./school.model.js")(sequelize, Sequelize);
db.ministry = require("./ministry.model")(sequelize, Sequelize);
db.mentor = require("./mentor.model.js")(sequelize, Sequelize);
db.speaker = require("./speaker.model.js")(sequelize, Sequelize);

module.exports = db;
