module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
      stu_username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    }, 
      gpd_username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },     
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
}, { 
      tableName: 'Comment',
      timestamps: false
});
    return Comment;
};