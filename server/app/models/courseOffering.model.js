// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
    const CourseOffering = sequelize.define("CourseOffering", {
      courseOfferingID: {
        type: Sequelize.STRING(45),
        primaryKey: true,
        allowNull: false,
        unique: true
  
      },
      courseID: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },      
      semester: {
      type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2'),
    },
      year: {
        type: Sequelize.INTEGER
    },
      section: {
        type: Sequelize.STRING(3)
    }
    });
  
    return CourseOffering;
  };