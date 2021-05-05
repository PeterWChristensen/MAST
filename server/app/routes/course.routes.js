module.exports = app => {
    const course = require("../controllers/course.controller.js");

    var router = require("express").Router();

    router.post("/addCourse", course.create);

    router.get("/getAllCourse", course.getAll);


    app.use('/', router);
}