// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
    const CoursePlan = sequelize.define("CoursePlan", {
      studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false  
      },
      courseOfferingID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false  
      },
      grade: {
        type: Sequelize.STRING
      }
    }, { 
      tableName: 'CoursePlan',
      timestamps: false
  
    });
  
    return CoursePlan;
  };
