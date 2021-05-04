module.exports = app => {
    const subArea = require("../controllers/subArea.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addSubArea", subArea.create);

    router.post("/getSubArea", subArea.getSubArea);
  
    app.use('/', router);
  };