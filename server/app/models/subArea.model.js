module.exports = (sequelize, Sequelize) => {
    const SubArea = sequelize.define("SubArea", {
        areaID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        subAreaID: {
            type: Sequelize.INTEGER,
        },
        departmentID: {
            type: Sequelize.STRING,
        },
        minCourses: {
            type: Sequelize.INTEGER,
        },
        minCredit: {
            type: Sequelize.INTEGER,
        },
        maxCredit: {
            type: Sequelize.INTEGER,
        },
        maxCourse: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, { 
        tableName: 'SubArea',
        timestamps: false
    });
      
        return SubArea;
    };