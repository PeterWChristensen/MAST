const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.studentID) {
        res.status(400).send({
            message: "StudentID must be specified!"
        });
        return;
    }

    const student = {
        studentID: req.body.studentID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        //requirementID: req.body.requirementID,
        //entrySemester: req.body.entrySemester,
        //entryYear: req.body.entryYear,
        //gradSemester: req.body.gradSemester,
        //gradYear: req.body.gradYear,
        nSemestersInProgram: req.body.nSemestersInProgram
        //gpa: req.body.gpa,
        //totalCredits: req.body.totalCredits,
        //projectOption: req.body.projectOption,
        //advisor: req.body.advisor,
        //hasGraduated: req.body.hasGraduated
    };

    const newStudent = Student.create(student)
        .then(data => {
            res.send(newStudent);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while adding Student"
            });
        });
    
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} All students sucessfully deleted!`});
        console.log("All students deleted")
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occurred while deleting all students"
        });
    });
};