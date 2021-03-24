const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  //place for database tables
  db.student = require("./student.model.js")(sequelize, Sequelize);

  //place for database tables
  db.courses = require("./course.model.js")(sequelize, Sequelize);

  //place for database tables
  db.departments = require("./department.model.js")(sequelize, Sequelize);
  
  //place for database tables
  db.courseOfferings = require("./courseOffering.model.js")(sequelize, Sequelize);

  //place for database tables
  db.coursePlans = require("./coursePlan.model.js")(sequelize, Sequelize);


  module.exports = db;