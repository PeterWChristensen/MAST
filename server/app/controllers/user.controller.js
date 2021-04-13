exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
exports.gpdBoard = (req, res) => {
    res.status(200).send("GPD Content.");
};

exports.studentBoard = (req, res) => {
    res.status(200).send("student Content.");
};
