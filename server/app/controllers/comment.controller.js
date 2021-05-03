const db = require("../models");
const Comment = db.comment;

const Op = db.Sequelize.Op;



// Create and Save a new comment
exports.create = (req, res) => {
  console.log("create comment at Controller. req.bodt =");  
  console.log(req.body);
    // Create a comment
    const comment = {
      stu_username: req.body.stu_username,
      gpd_username: req.body.gpd_username,
      comment: req.body.comment,
      date: req.body.date
    };
 
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the comment."
        });
      });
  };



exports.getComment = (req, res) => {
  console.log("getComment at Controller.");  
  console.log(req.body);
    Comment.findAll({
        where: {
          stu_username: req.body.stu_username
          }
        })
          .then(comments => {                    
            res.status(200).send(comments);  
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while finding Student"
            });
        });
    };

exports.deleteComment = (req,res) => {
  console.log("destroy comments at Controller.");  
  console.log(req.body);
  Comment.destroy({
        where: {
            stu_username: req.body.stu_username,
            date: req.body.date
            }
        })
          .then(                    
            res.status(200).send("comments are deleted")
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while deleting a comment"
            });
        });
    };
