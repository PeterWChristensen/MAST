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

  db.course = require("./course.model.js")(sequelize, Sequelize);

  db.department = require("./department.model.js")(sequelize, Sequelize);
  
  db.courseOffering = require("./courseOffering.model.js")(sequelize, Sequelize);

  db.degreeRequirement = require("./degreeRequirement.model.js")(sequelize, Sequelize);

  db.coursePlan = require("./coursePlan.model.js")(sequelize, Sequelize);

  db.prerequisite = require("./prerequisite.model.js")(sequelize, Sequelize);

  db.user = require("../models/user.model.js")(sequelize, Sequelize);
  
  db.ROLES = ["gpd", "student"];


  module.exports = db;