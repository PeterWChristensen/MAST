module.exports = (sequelize, Sequelize) => {
    const AreaRequirement = sequelize.define("AreaRequirement", {
        areaID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        departmentID: {
            type: Sequelize.STRING,
        },
        nSubAreas: {
            type: Sequelize.INTEGER,
        },
        nCourses: {
            type: Sequelize.INTEGER,
        },
        nCredits: {
            type: Sequelize.INTEGER,
        }
    }, { 
        tableName: 'AreaRequirement',
        timestamps: false
    });
      
        return AreaRequirement;
    };