module.exports = app => {
    const student = require("../controllers/student.controller.js");

    var router = require("express").Router();

    router.post("/addStudent", student.create);

    router.delete("/", student.deleteAll);

    router.get("/getStudents", student.getAll);

    app.use('/', router);
}