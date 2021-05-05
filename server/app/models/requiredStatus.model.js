module.exports = (sequelize, Sequelize) => {
    const RequiredStatus = sequelize.define("RequiredStatus", {
        studentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }, 
        courseID: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM('Satisfied','Pending','Unsatisfied')
        }
    }, { 
        tableName: 'RequiredStatus',
        timestamps: false
    });
      
        return RequiredStatus;
};