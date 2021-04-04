const db = require("../models");
const Prerequisite = db.prerequisite;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.courseID) {
        res.status(400).send({
            message: "StudentID must be specified!"
        });
        return;
    }

    const prerequisite = {
        courseID: req.body.courseID,
        prerequisiteID: req.body.prerequisiteID
    };
    const newPrerequisite = Prerequisite.create(prerequisite)
        .then(data => {
            res.send(newPrerequisite);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while adding Prerequisite"
            });
        });
    
};

