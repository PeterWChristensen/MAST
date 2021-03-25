module.exports = app => {
    const department = require("../controllers/department.controller.js");

    var router = require("express").Router();

    router.post("/addDepartment", department.create);

    app.use('/', router);
}