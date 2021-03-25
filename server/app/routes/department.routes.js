module.exports = app => {
    const department = require("../controllers/department.controller.js");

    var router = require("express").Router();

    router.post("/FILLEr", department.create);

    app.use('/', router);
}