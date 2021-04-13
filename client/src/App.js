import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link  } from 'react-router-dom';


//Import Components
import LoginScreen from './components/login_screen/LoginScreen.js';
import GPDHomeScreen from './components/home_screen/GPDHome.component.js';
import AddStudentScreen from './components/add_student/AddStudentScreen.js';
// import Navbar from './components/navbar/Navbar.js';
import Profile from "./components/Student_Prof/ProfileScreen.js";
import HomeScreen from "./components/home_screen/Home.component";

import AuthService from './services/auth.service';


class App extends Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showGPDcomponent: false,
      showStudentcomponent: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showGPDcomponent: user.roles.includes("gpd"),
        showStudentcomponent: user.roles.includes("student"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }






  render() {
    const { currentUser, showGPDcomponent, showStudentcomponent } = this.state;

    return (
      <div className="App">

        <nav id="navbar" className="banner">
          <div class="container">
            <b class="brand-logo">MAST</b>
            <div className="nav-wrapper">
              <ul id="nav-mobile" className="right">
                {/* <li>
                  <Link to={"/"} className="navBarButtons">
                    Home
                  </Link>
                </li> */}

                
                {showGPDcomponent && (
                  <li>
                    <Link to={"/gpd"} className="navBarButtons">
                      gpdHome
                    </Link>
                  </li>
                )}

                {currentUser && (
                      <li>
                        <Link to={"/profile"} className="navBarButtons">
                          Profile
                        </Link>
                      </li>
                )}

                {currentUser ? (
                  <li>
                    <a href="/" className="navBarButtons" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                ) : (
                  <li>
                    <Link to={"/login"} className="navBarButtons">
                      Login
                    </Link>
                  </li>
                )}    
              </ul>
            </div>       


              {/* {showStudentcomponent && (
                <li className="nav-item">
                  <Link to={"/student"} className="nav-link">
                    studentHome
                  </Link>
                </li>
              )}             */}


          </div>          
        </nav>  
          
            <div>
              <Switch>
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/gpd" component={GPDHomeScreen} />
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/addStudent" component={AddStudentScreen} />
              </Switch>
            </div>
       </div>
    );
  }
}
export  default App;

