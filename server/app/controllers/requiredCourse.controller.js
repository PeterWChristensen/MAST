const db = require("../models");
const RequiredCourse = db.requiredCourse;
const Op = db.Sequelize.Op;

// Create and Save a new DegreeRequirement
exports.create = (req, res) => {
    console.log("here")
    // Validate request
    if (!(req.body.requirementID && req.body.courseID)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const requiredCourse = {
      requirementID: req.body.requirementID,
      courseID:req.body.courseID,
      departmentID: req.body.departmentID
    };
  
    // Save degreeRequirement in the database
    console.log("requiredCourse is==")
    console.log(requiredCourse);
    const newRequiredCourse = RequiredCourse.create(requiredCourse)
      .then(data => {
        res.send(newRequiredCourse);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Area."
        });
      });
  };