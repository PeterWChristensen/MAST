const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const path = __dirname + '/app/views/';
const app = express();




var corsOption = {
	origin: "http://localhost:8080"
};

app.use(express.static(path));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get("/", (req, res) => {
	res.sendFile(path + "index.html");
});

require("./app/routes/student.routes")(app);
require("./app/routes/courseOffering.routes")(app);
require("./app/routes/coursePlan.routes")(app);
require("./app/routes/prerequisite.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/course.routes")(app);
require("./app/routes/degreeRequirement.routes")(app);
require("./app/routes/comment.routes")(app);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/msStudent.route")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log("Server is running on port 8080.");
});

const db = require("./app/models");
db.sequelize.sync();

