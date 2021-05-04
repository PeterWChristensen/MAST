const db = require("../models");
const CourseOffering = db.courseOffering;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.courseOfferingID) {
        res.status(400).send({
            message: "CourseOfferingID must be specified!"
        });
        return;
    }

    const courseOffering = {
        courseOfferingID: req.body.courseOfferingID,
        courseID: req.body.courseID,
        semester: req.body.semester,
        year: req.body.year,
        section: req.body.section,
        day: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    };

    console.log(courseOffering);
    const newCourseOffering = CourseOffering.create(courseOffering)
        .then(data => {
            res.send(newCourseOffering);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while importing Course Offering"
            });
        });
    
};


exports.getAll = (req, res) => {
    console.log("getAll Course Offerings at Controller.");  
    console.log(req.body);
    CourseOffering.findAll({
          where: {
            courseID: req.body.courseID
            }
          })
            .then(data => {                    
              res.status(200).send(data);  
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Error has occured while finding Course Offerings"
              });
          });
      };
