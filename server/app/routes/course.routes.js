module.exports = app => {
    const course = require("../controllers/course.controller.js");

    var router = require("express").Router();

    router.post("/addCourse", course.create);

    app.use('/', router);
}