// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("Course", {
      courseID: {
      type: Sequelize.STRING(6),
      primaryKey: true,
      allowNull: false,
      unique: true
    },      
      departmentID: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
      name: {
        type: Sequelize.STRING(45)
    },
      description: {
        type: Sequelize.STRING(100)
    },
      credit: {
        type: Sequelize.INTEGER
    },
      courseNum: {
        type: Sequelize.INTEGER
    }
    });
  
    return Course;
  };