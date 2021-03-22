import React from 'react';
import { NavLink } from 'react-router-dom'

class LoggedInLinks extends React.Component {
  render() {
    return (
      <div className="right">
          <NavLink to="/"><button id="homeButton" className="navBarButtons">Home</button></NavLink>
          <NavLink to="/"><button id="logOutButton" className="navBarButtons">Log Out</button></NavLink>
      </div>
    );
  };
}

export default LoggedInLinks;