const db = require("../models");
const Department = db.department;
const Op = db.Sequelize.Op;

// Create and Save a new department
exports.create = (req, res) => {
    // Validate request
    if (!req.body.departmentID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Department
    const department = {
      departmentID: req.body.departmentID,
      departmentName: req.body.departmentName
    };
  
    // Save Department in the database
    Department.create(Department)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the department."
        });
      });
  };

// Retrieve all Course from the database.
exports.findAll = (req, res) => {
  const departmentID = req.query.departmentID;
  var condition = departmentID ? { departmentID: { [Op.like]: `%${departmentID}%` } } : null;

  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving department."
      });
    });
};



  // Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Department.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Department with departmentId=" + id
        });
      });
  };
  