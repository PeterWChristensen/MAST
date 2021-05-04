const { signUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      signUp.checkDuplicateUsernameOrUserID,
      signUp.checkRolesExisted
    ],
    controller.signup
  );

  app.delete("/deletestu", controller.deleteUser);


  app.post("/api/auth/signin", controller.signin);

};
