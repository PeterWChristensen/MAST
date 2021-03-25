// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("Course", {
      courseID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    }, 
      semester: {
        type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2'),
        primaryKey: true,
        allowNull: false
    },
      year: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },     
      departmentID: {
        type: Sequelize.STRING,
        allowNull: false,
    },
      name: {
        type: Sequelize.STRING
    },
      description: {
        type: Sequelize.STRING
    },
      credits: {
        type: Sequelize.STRING
    },
      courseNum: {
        type: Sequelize.INTEGER
    }
}, { 
      tableName: 'Course',
      timestamps: false
});
    return Course;
};