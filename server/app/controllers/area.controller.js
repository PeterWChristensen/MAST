const db = require("../models");
const Area = db.area;
const Op = db.Sequelize.Op;

// Create and Save a new DegreeRequirement
exports.create = (req, res) => {
    console.log("here")
    // Validate request
    if (!(req.body.areaID && req.body.requirementID)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const area = {
      areaID: req.body.areaID,
      requirementID: req.body.requirementID,
      departmentID: req.body.departmentID,
      name: req.body.name
    };
  
    // Save degreeRequirement in the database
    console.log("area is==")
    console.log(area);
    const newArea = Area.create(area)
      .then(data => {
        res.send(newArea);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Area."
        });
      });
  };


  


  exports.getArea = (req, res) => {
    console.log("getArea at Controller.");  
    console.log(req.body);
    Area.findOne({
          where: {
            requirementID: req.body.requirementID
            // departmentID: req.body.departID
            }
          })
            .then(data => {                    
              res.status(200).send(data);  
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Error has occured while finding Area"
              });
          });
      };
  