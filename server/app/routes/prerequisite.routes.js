module.exports = app => {
    const prerequisite = require("../controllers/prerequisite.controller.js");
  
    var router = require("express").Router();
  
    // Create a new coursePlan
    router.post("/addPrerequisite", prerequisite.create);
  
  
    app.use('/', router);
  };