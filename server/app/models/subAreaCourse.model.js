module.exports = (sequelize, Sequelize) => {
    const SubAreaCourse = sequelize.define("SubAreaCourse", {
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
        track: {
            type: Sequelize.STRING,
        },
        areaID: {
            type: Sequelize.INTEGER,
        },
        subAreaID: {
            type: Sequelize.INTEGER,
        }
    }, { 
        tableName: 'SubAreaCourse',
        timestamps: false
    });
      
        return SubAreaCourse;
    };