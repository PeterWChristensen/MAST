// In our project, we dont need this bc we have our teble already in DB. Sequelize supports all of CRUD functions. 
module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    departmentID: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true

    },
    departmentName: {
      type: Sequelize.STRING
    }
  
}, { 
  tableName: 'Department',
  timestamps: false
});

  return Department;
};