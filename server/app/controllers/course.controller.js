const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.courseID && req.body.departID) ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const course = {
      courseID: req.body.courseID,
      departID: req.body.departID,
      name: req.body.name,
      description: req.body.description,
      credits: req.body.credits,
      semester: req.body.semester,
      year: req.body.year

    };
  
    // Save Course in the database
    Course.create(course)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Course."
        });
      });
  };

  exports.getCourseInfo = (req, res) => {
    console.log("getCourseInfo at Controller.");  
    console.log(req.body);
      Course.findOne({
          where: {
              credit: req.body.credit
            }
          })
            .then(user => {
              if (!user) {
                  return res.status(404).send({ message: "Course Not found." });
                }
                      
              const course = {
                courseID: req.body.courseID,
                departID: req.body.departID,
                name: req.body.name,
                description: req.body.description,
                credits: req.body.credits,
                semester: req.body.semester,
                year: req.body.year
              };  
              console.log(course)
              res.status(200).send(course);  
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Error has occured while finding Course"
              });
          });
  };

// Retrieve all Course from the database.
exports.findAll = (req, res) => {
    const courseID = req.query.courseID;
    var condition = courseID ? { courseID: { [Op.like]: `%${courseID}%` } } : null;
  
    Course.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving course with id=" + id
        });
      });
  };
