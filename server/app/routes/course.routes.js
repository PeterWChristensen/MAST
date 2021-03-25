module.exports = app => {
    const course = require("../controllers/course.controller.js");

    var router = require("express").Router();

    router.post("/FILLER", course.create);

    app.use('/', router);
}