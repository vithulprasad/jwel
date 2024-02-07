module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define("modules", {
    module_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    module_name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["Active", "Inactive"],
      defaultValue: "Active",
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return Module;
};
