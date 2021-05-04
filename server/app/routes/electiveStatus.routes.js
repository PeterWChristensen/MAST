module.exports = app => {
    const electiveStatus = require("../controllers/electiveStatus.controller.js");
  
    var router = require("express").Router();

    router.get("/getElectiveStatus", electiveStatus.getElectiveStatus);


    app.use('/', router);
  };