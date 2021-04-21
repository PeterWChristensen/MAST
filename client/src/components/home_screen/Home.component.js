import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserService from "../../services/user.service";
import MSStudentService from "../../services/msStudent.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    MSStudentService.removeInfo();

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>{this.state.content}</h3>
        </header>
        <div id="homepageDescription">
          <div id="mastheader">MAST</div>
          <div id="mastheader2">MAster's Student Tracking</div>
          <br></br>
          <div id="programDescription">
            <p>
              This program is used by master's students to manage and track their degree progress. 
              Students can view and edit their profile, check their degree progress, find course plans,
              and view comments from their graduate program director. 
              Graduate Program Directors can manage the degree, course, and student's data. This 
              includes importing data from files and deleting data, viewing and editing student's profiles, 
              suggesting course plans, and leaving comments.
            </p>
          </div>
          <br></br>
          <Link to="/login"><button id="homepageLoginButton">Login</button></Link>
        </div>
      </div>
    );
  }
}