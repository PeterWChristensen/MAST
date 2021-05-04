module.exports = app => {
    const requiredCourse = require("../controllers/requiredCourse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addRequiredCourse", requiredCourse.create);
  
    app.use('/', router);
  };