// This will be changed to student view from student account.
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import MSStudentService from "../../services/msStudent.service";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }





  render() {
    
    const { currentUser } = this.state;
    const { student } = MSStudentService.getinfo(AuthService.getCurrentUser().username);

    console.log("currentUser is :")
    console.log(currentUser);
    console.log("student is :")
    console.log(student);
    console.log(MSStudentService.getinfo(AuthService.getCurrentUser().username));

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
        {/* <p>
          <strong>firstname:</strong>{" "}
          {student.firstName}
        </p> */}

      </div>
    );
  }
}