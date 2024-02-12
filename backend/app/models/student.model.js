module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    student_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_name: {
      type: Sequelize.STRING,
    },
    school: {
      type: Sequelize.STRING,
    },
    school_address: {
      type: Sequelize.STRING,
    },
    email_address: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    parents_phone_number: {
      type: Sequelize.STRING,
    },
    student_type: {
      type: Sequelize.ENUM,
      values: ["student", "admin", "notDefined"],
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  });

  return Student;
};
