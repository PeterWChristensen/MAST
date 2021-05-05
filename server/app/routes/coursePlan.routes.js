module.exports = app => {
    const coursePlan = require("../controllers/coursePlan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new coursePlan
    router.post("/addCoursePlan", coursePlan.create);

    router.get("/getAllCoursePlan", coursePlan.getAll);


  
    app.use('/', router);
  };