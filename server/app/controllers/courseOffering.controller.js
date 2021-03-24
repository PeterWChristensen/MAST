const db = require("../models");
const CourseOffering = db.courseOfferings;
const Op = db.Sequelize.Op;

// Create and Save a new courseOffering
exports.create = (req, res) => {
    // Validate request
    if (!req.body.courseOfferingID  ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a CourseOffering
    const courseOffering = {
      courseOfferingID: req.body.courseOfferingID,
      courseID: req.body.courseID,
      semester: req.body.semester,
      year: req.body.year,
      section: req.body.section
    
    };
  
    // Save CourseOffering in the database
    CourseOffering.create(courseOffering)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the CourseOffering."
        });
      });
  };

// Retrieve all CourseOffering from the database.
exports.findAll = (req, res) => {
    const courseOfferingID = req.query.courseOfferingID;
    var condition = courseOfferingID ? { courseOfferingID: { [Op.like]: `%${courseOfferingID}%` } } : null;
  
    CourseOffering.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courseOfferingID."
        });
      });
  };

// Find a single courseOfferingID with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    CourseOffering.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving CourseOffering with id=" + id
        });
      });
  };
