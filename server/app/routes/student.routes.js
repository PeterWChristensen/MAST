module.exports = app => {
    const student = require("../controllers/student.controller.js");

    var router = require("express").Router();

    router.post("/", student.create);

    app.use('/addStudent', router);
}