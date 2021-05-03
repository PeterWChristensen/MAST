const db = require("../models");
const SubAreaCourse = db.subAreaCourse;
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
  
    const subAreaCourse = {
      requirementID: req.body.requirementID,
      courseID:req.body.courseID,
      departmentID: req.body.departmentID,
      track:req.body.track,
      areaID: req.body.areaID,
      subAreaID: req.body.subAreaID
    };
  
    // Save degreeRequirement in the database
    console.log("subAreaCourse is==")
    console.log(subAreaCourse);
    const newSubAreaCourse = SubAreaCourse.create(subAreaCourse)
      .then(data => {
        res.send(newSubAreaCourse);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Area."
        });
      });
  };