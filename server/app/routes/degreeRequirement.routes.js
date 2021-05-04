module.exports = app => {
    const degreeRequirement = require("../controllers/degreeRequirement.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addDegreeRequirement", degreeRequirement.create);

    router.post("/getDegreeRequirement", degreeRequirement.getDegreeRequirement);

    app.use('/', router);
  };