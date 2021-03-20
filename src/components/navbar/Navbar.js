import React from 'react';
import LoggedInLinks from './LoggedInLinks';

class Navbar extends React.Component {
  
  render() {
    const links = <LoggedInLinks />;

    return (
      <nav id="navbar" className="banner">
        <div className="container">
          <b className="brand-logo">MAST</b>
          {links}
        </div>
      </nav>
    );
  };
}

export default Navbar;