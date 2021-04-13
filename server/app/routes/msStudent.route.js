const student = require("../controllers/MSstudent.controller.js");

module.exports = app => {

    var router = require("express").Router();

    router.post("/getinfo", student.getinfo);

    app.use('/', router);
}