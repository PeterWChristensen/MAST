module.exports = (sequelize, Sequelize) => {
    const RequiredCourse = sequelize.define("RequiredCourse", {
        requirementID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        courseID: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        departmentID: {
            type: Sequelize.STRING,
        },
        credit: {
            type: Sequelize.INTEGER,
        }
    }, { 
        tableName: 'RequiredCourse',
        timestamps: false
    });
      
        return RequiredCourse;
    };