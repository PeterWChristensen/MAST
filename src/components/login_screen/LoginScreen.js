import React, { Component } from 'react';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { target } = e;//shorthand for const target = e.target

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div id="loginScreen">
        <div id="loginBanner" className="banner">
            MAST  |  Master's Student Tracking<br />
        </div>
        <div id="loginBox">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s4 white">
          <b id="loginTextHeading">MAST</b>
            <h5 className="loginBoxText">Login</h5>
            <div className="input-field">
              <label htmlFor="email" className="loginBoxText">Email: </label>
              <input className="active" className="loginInput" type="email" name="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password" className="loginBoxText">Password: </label>
              <input className="active"  className="loginInput" type="password" name="password" id="password" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button type="submit" id="loginButton">Login</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

export default  LoginScreen;