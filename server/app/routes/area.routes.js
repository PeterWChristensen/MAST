module.exports = app => {
    const area = require("../controllers/area.controller.js");
  
    var router = require("express").Router();
  
    // Create a new degreeRequirement
    router.post("/addArea", area.create);
  
    app.use('/', router);
  };