module.exports = app => {
    const courseOffering = require("../controllers/courseOffering.controller.js");

    var router = require("express").Router();

    router.post("/", courseOffering.create);

    router.get("/getCourseOfferings", courseOffering.getAll);

    app.use('/', router);
}