const db = require("../models");
const SubArea = db.subArea;
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
  
    const subArea = {
      areaID: req.body.areaID,
      subAreaID: req.body.subAreaID,
      departmentID: req.body.departmentID,
      minCourses: req.body.minCourses,
      minCredit: req.body.minCredit,
      maxCredit: req.body.maxCredit,
      maxCourse: req.body.maxCourse,
      name: req.body.name
    };
  
    // Save degreeRequirement in the database
    console.log("subArea is==")
    console.log(subArea);
    const newSubArea = SubArea.create(subArea)
      .then(data => {
        res.send(newSubArea);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Area."
        });
      });
  };

  

  

  exports.getSubArea = (req, res) => {
    console.log("getSubArea at Controller.");  
    console.log(req.body);
    SubArea.findAll({
          where: {
            areaID: req.body.areaID,
            // departmentID:req.body.departmentID
            }
          })
            .then(data => {                    
              res.status(200).send(data);  
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Error has occured while finding subArea"
              });
          });
      };
  