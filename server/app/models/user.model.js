module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      roles: {
        type: Sequelize.STRING
      }
}, { 
    tableName: 'User',
    timestamps: false
});
      
    return User;
  };