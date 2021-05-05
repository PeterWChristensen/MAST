const coursePlan = require("../controllers/coursePlan.controller.js");

module.exports = app => {
  
    var router = require("express").Router();
  
    // Create a new coursePlan
    router.post("/addCoursePlan", coursePlan.create);

    router.get("/getAllCoursePlan", coursePlan.getAll);

    router.post("/getStuCoursePlan", coursePlan.getStuCoursePlan);


  
    app.use('/', router);
  };