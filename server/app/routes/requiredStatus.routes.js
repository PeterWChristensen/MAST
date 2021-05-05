module.exports = app => {
    const requiredStatus = require("../controllers/requiredStatus.controller.js");
  
    var router = require("express").Router();

    router.post("/getRequiredStatus", requiredStatus.getRequiredStatus);


    app.use('/', router);
  };