module.exports = app => {
    const areaRequirement = require("../controllers/areaRequirement.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addAreaRequirement", areaRequirement.create);
  
    app.use('/', router);
  };