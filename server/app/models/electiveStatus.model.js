module.exports = (sequelize, Sequelize) => {
    const ElectiveStatus = sequelize.define("ElectiveStatus", {
        studentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        
        areaID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
        }
    }, { 
        tableName: 'ElectiveStatus',
        timestamps: false
    });
      
        return ElectiveStatus;
};