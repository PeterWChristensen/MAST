module.exports = app => {
    const requiredStatus = require("../controllers/requiredStatus.controller.js");
  
    var router = require("express").Router();

    router.get("/getRequiredStatus", requiredStatus.getRequiredStatus);


    app.use('/', router);
  };