const db = require("../models");
const CoursePlan = db.coursePlan;
const Op = db.Sequelize.Op;

// Create and Save a new CoursePlan
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.courseOfferingID && req.body.studentID)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a CoursePlan
    const coursePlan = {
      studentID: req.body.studentID,
      courseOfferingID: req.body.courseOfferingID,
      grade: req.body.grade
    };
  
    // Save CoursePlan in the database
    console.log("CoursePlan is==")
    console.log(coursePlan);
    CoursePlan.create(coursePlan)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the CoursePlan."
        });
      });
  };

// Retrieve all coursePlans from the database.
exports.findAll = (req, res) => {
    const studentID = req.query.studentID;
    var condition1 = studentID ? { studentID: { [Op.like]: `%${studentID}%` } } : null;

    const courseOfferingID = req.query.courseOfferingID;
    var condition2 = courseOfferingID ? { courseOfferingID: { [Op.like]: `%${courseOfferingID}%` } } : null;
    
  
    CoursePlan.findAll({ where: Sequelize.and({condition1}, {condition2}) })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving coursePlans."
        });
      });
  };

// Find a single CoursePlan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    CoursePlan.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving CoursePlan with id=" + id
        });
      });
  };

// Update a CoursePlan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    CoursePlan.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "CoursePlan was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update CoursePlan with id=${id}. Maybe CoursePlan was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating CoursePlan with id=" + id
        });
      });
  };
