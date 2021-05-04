module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("Area", {
        areaID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        requirementID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        departmentID: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, { 
        tableName: 'Area',
        timestamps: false
    });
      
        return Area;
    };