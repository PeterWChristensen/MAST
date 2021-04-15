import React, { Component } from "react";

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
      </div>
    );
  }
}