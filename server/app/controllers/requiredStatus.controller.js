const db = require("../models");
const RequiredStatus = db.requiredStatus;
const Op = db.Sequelize.Op;


exports.getRequiredStatus = (req, res) => {
    console.log("getRequiredStatus at Controller.");  
    console.log(req.body);
    RequiredSatus.findAll({
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
                  message: err.message || "Error has occured while finding RequiredStatus"
              });
          });
      };