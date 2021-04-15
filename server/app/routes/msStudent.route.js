const student = require("../controllers/MSstudent.controller.js");

module.exports = app => {

    var router = require("express").Router();

    router.post("/getinfo", student.getinfo);

    router.put("/updateinfo", student.updateinfo);

    app.use('/', router);
}