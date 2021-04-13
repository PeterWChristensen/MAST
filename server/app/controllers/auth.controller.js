const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    userID: req.body.userID,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: req.body.roles
  })
  .then(() => {
    res.send({ message: "User was registered successfully!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error catched: signup at auth.controller.js" });
  });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.userID }, config.secret, {
        expiresIn: 86400 // 24 hours

      });
      console.log("auth.controller for user.id");
      console.log(user.userID);
      res.status(200).send({
        id: user.userID,
        username: user.username,
        userID: user.userID,
        roles: user.roles,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};