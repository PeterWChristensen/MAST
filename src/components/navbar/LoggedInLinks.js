import React from 'react';
import { NavLink } from 'react-router-dom'

class LoggedInLinks extends React.Component {
  render() {
    return (
        <button><NavLink to="/">Log Out</NavLink></button>
    );
  };
}

export default LoggedInLinks;