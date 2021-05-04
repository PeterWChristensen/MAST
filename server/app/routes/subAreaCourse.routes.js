module.exports = app => {
    const subAreaCourse = require("../controllers/subAreaCourse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addSubAreaCourse", subAreaCourse.create);

    router.post("/getSubAreaCourse", subAreaCourse.getSubAreaCourse);
  
    app.use('/', router);
  };