const comment = require("../controllers/comment.controller.js");

module.exports = app => {

    var router = require("express").Router();

    router.post("/addcmt", comment.create);

    router.delete("/deletecmt", comment.deleteComment);

    router.post("/getcmt", comment.getComment);

    app.use('/', router);
}