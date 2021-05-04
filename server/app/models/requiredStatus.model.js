module.exports = (sequelize, Sequelize) => {
    const RequiredStatus = sequelize.define("RequiredStatus", {
        studentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        
        courseID: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
        }
    }, { 
        tableName: 'RequiredStatus',
        timestamps: false
    });
      
        return RequiredStatus;
};