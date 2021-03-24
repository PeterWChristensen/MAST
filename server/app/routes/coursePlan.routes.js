module.exports = app => {
    const coursePlans = require("../controllers/coursePlan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new coursePlan
    router.post("/", coursePlans.create);
  
    // Retrieve all Tutorials
    router.get("/", coursePlans.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", coursePlans.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", coursePlans.update);
  
    app.use('/importGrade', router);
  };