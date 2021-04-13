const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrUserID = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Username is duplicated"
      });
      return;
    }

    // userID
    User.findOne({
      where: {
        userID: req.body.userID
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "userID is duplicated"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: "Role does not exist = " + req.body.roles
        });
        return;
      }
  }
  
  next();
};

const signUp = {
  checkDuplicateUsernameOrUserID: checkDuplicateUsernameOrUserID,
  checkRolesExisted: checkRolesExisted
};

module.exports = signUp;