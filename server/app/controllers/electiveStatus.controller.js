const db = require("../models");
const ElectiveStatus = db.electiveStatus;
const Op = db.Sequelize.Op;


exports.getElectiveStatus = (req, res) => {
    console.log("getElectiveStatus at Controller.");  
    console.log(req.body);
    ElectiveStatus.findAll({
          where: {
            studentID: req.body.studentID,
            status: "unsatisfied"
            }
          })
            .then(data => {                    
              res.status(200).send(data);  
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Error has occured while finding ElectiveStatus"
              });
          });
      };