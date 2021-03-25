module.exports = app => {
    const coursePlan = require("../controllers/coursePlan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new coursePlan
    router.post("/addCoursePlan", coursePlan.create);
  
    // Retrieve all Tutorials
    router.get("/", coursePlan.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", coursePlan.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", coursePlan.update);
  
    app.use('/', router);
  };