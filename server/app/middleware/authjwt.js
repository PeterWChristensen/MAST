const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("token at verifyToken from authjwt.js ");
  console.log(token);
  if (!token) {
    return res.status(403).send({
      message: "Error: No token."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Error: Unauthorized."
      });
    }
    req.userId = decoded.id;
  
    next();
  });
};

isGPD = (req, res, next) => {
  console.log("isGPD"); 
  User.findOne({
    where: {
      userID: req.userId
    }
  }).then(user => {
    console.log(user);
        if(user.roles === "gpd") {
          next();
          return;
        }

      res.status(403).send({
        message: "Require GPD Role!"
      });
      return;
  });
};

isStudent = (req, res, next) => {
  console.log("isStudent"); 
  User.findOne({
    where: {
      userID: req.userId
    }
  }).then(user => {
    console.log(user);
        if (user.roles === "student") {
          next();
          return;
        }

      res.status(403).send({
        message: "Require Student Role!"
      });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isGPD: isGPD,
  isStudent: isStudent
};
module.exports = authJwt;

