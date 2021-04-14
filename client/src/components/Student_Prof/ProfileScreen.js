// This will be changed to student view from student account.
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import MSStudentService from "../../services/msStudent.service";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      studentID: "",
      firstName: "",
      lastName: "",
      //requirementID: "",
      entrySemester: "",
      entryYear: "",
      //gradSemester: "",
      //gradYear: "",
      nSemestersInProgram: "",
      //gpa: "",
      //totalCredits: "",
      //projectOption: "",
      //advisor: "",
      //hasGraduated: ""
      email: "",
      departmentID: ""
    }
  }


componentDidMount(){
  console.log("didMount Function");
  MSStudentService.getinfo(AuthService.getCurrentUser().username);
  var info=MSStudentService.getStudentInfo();

  this.setState({
    studentID: info.studentID,
    firstName: info.firstName,
    lastName: info.lastName,
    //requirementID: info.requirementID,
    entrySemester: info.entrySemester,
    entryYear: info.entryYear,
    //gradSemester: info.gradSemester,
    //gradYear: info.gradYear,
    nSemestersInProgram: info.nSemestersInProgram,
    //gpa: info.gpa,
    //totalCredits: info.totalCredits,
    //projectOption: info.projectOption,
    //advisor: info.advisor,
    //hasGraduated: info.hasGraduated
    email: info.email,
    departmentID: info.departmentID
  });
}

  render() {
    const { currentUser, firstName } = this.state;



    console.log("currentUser is :")
    console.log(currentUser);
    console.log("firstName is :")
    console.log(firstName);

    
    return (
      <div>
        <header>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.userID}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.username}
        </p>
        <strong>Authorities:</strong>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.roles}
        </p>
        <p>
          <strong>firstname:</strong>{" "}
          {firstName}
        </p>

      </div>
    );
  }
}

export default Profile;
