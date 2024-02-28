module.exports = (sequelize, Sequelize) => {
    const Speaker = sequelize.define("speaker", {
      speaker_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      speaker_name: {
        type: Sequelize.STRING,
      },
      speaker_email: {
        type: Sequelize.STRING,
      },
      speaker_password: {
        type: Sequelize.STRING,
      },
  
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  
    return Speaker;
  };
  