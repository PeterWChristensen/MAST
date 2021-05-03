module.exports = app => {
    const subArea = require("../controllers/subArea.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addSubArea", subArea.create);
  
    app.use('/', router);
  };