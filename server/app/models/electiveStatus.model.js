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
            type: Sequelize.ENUM('Satisfied','Pending','Unsatisfied'),
        }
    }, { 
        tableName: 'ElectiveStatus',
        timestamps: false
    });
      
        return ElectiveStatus;
};