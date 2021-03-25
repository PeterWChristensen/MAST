// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
    const Prerequisite = sequelize.define("Prerequisite", {
      courseID: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },      
      prerequisiteID: {
      type: Sequelize.STRING,
      allowNull: false,
    }
}, { 
      tableName: 'Prerequisite',
      timestamps: false
});
    return Prerequisite;
};