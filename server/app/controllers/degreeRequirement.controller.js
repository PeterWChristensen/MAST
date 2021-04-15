const db = require("../models");
const DegreeRequirement = db.degreeRequirement;
const Op = db.Sequelize.Op;

// Create and Save a new DegreeRequirement
exports.create = (req, res) => {
    console.log("here")
    // Validate request
    if (!req.body.requirementID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const degreeRequirement = {
      requirementID: req.body.requirementID,
      departID: req.body.departID,
      track: req.body.track,
      versionSemester: req.body.versionSemester,
      versionYear: req.body.versionYear,
      totalCredit: req.body.totalCredit,
      project: req.body.project,
      thesis: req.body.thesis,
      timeLimit: req.body.timeLimit,
      finalRecommended: req.body.finalRecommended,
      minGPA: req.body.minGPA
    };
  
    // Save degreeRequirement in the database
    console.log("degreeRequirement is==")
    console.log(degreeRequirement);
    const newDegreeRequirement = DegreeRequirement.create(degreeRequirement)
      .then(data => {
        res.send(newDegreeRequirement);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the DegreeRequirement."
        });
      });
  };