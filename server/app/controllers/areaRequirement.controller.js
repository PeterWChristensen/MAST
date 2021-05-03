const db = require("../models");
const AreaRequirement = db.areaRequirement;
const Op = db.Sequelize.Op;

// Create and Save a new DegreeRequirement
exports.create = (req, res) => {
    console.log("here")
    // Validate request
    if (!req.body.areaID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const areaRequirement = {
      areaID: req.body.areaID,
      departmentID: req.body.departmentID,
      nSubAreas: req.body.nSubAreas,
      nCourses: req.body.nCourses,
      nCredits: req.body.nCredits
    };
  
    // Save degreeRequirement in the database
    console.log("areaRequirement is==")
    console.log(areaRequirement);
    const newAreaRequirement = AreaRequirement.create(areaRequirement)
      .then(data => {
        res.send(newAreaRequirement);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Area."
        });
      });
  };