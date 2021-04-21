import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";


//I will add meterialize css later. 

const requiredUser = value => {
  if (!value) {
    return (
      <div class="validAlert" role="alert">
        <strong >Username is required!</strong>
      </div>
    );
  }
};

const requiredPW = value => {
  if (!value) {
    return (
      <div class="validAlert" role="alert">
        <strong >Password is required!</strong>
      </div>
    );
  }
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    //Form validateAll() method to check validation functions in validations.
    this.form.validateAll();
    //verify if the form validation is successful or not.
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

render() {
  return (
    <div id="loginScreen">
      <div id="loginBox">
        <div className="row">
          <Form onSubmit={this.handleLogin} 
          ref={c => {
            this.form = c;
          }} className="col s4 white">

          <b id="loginTextHeading"></b>
            <h5 className="loginBoxText">Login</h5>
            
          <div className="input-field">
            <label htmlFor="username" className="loginBoxText">Username: </label>
            <Input className="active" className="loginInput" type="text"
             name="username" value={this.state.username} onChange={this.onChangeUsername}
             validations={[requiredUser]} />
          </div>
          
          <div className="input-field">
            <label htmlFor="password" className="loginBoxText">Password: </label>
            <Input className="active"  className="loginInput" type="password" 
            name="password" value={this.state.password} onChange={this.onChangePassword} 
            validations= {[requiredPW]} />
          </div>

          <div className="input-field">
            <button type="submit" id="loginButton">Login</button>
          </div>

           
          {this.state.message && (
            <div>
              <div class="validAlert" role="alert">
                {this.state.message}
              </div>
            </div>
          )}     

          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />

          </Form>
        </div>
      </div>
    </div>
  );
}
}