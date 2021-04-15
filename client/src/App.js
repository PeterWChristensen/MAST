
import React, { Component } from 'react';
import { Switch, Route, Link ,Redirect  } from 'react-router-dom';


//Import Components
import LoginScreen from './components/login_screen/LoginScreen.js';
import GPDHomeScreen from './components/home_screen/GPDHomeScreen.js';
import AddStudentScreen from './components/add_student/AddStudentScreen.js';
// import Navbar from './components/navbar/Navbar.js';
import Profile from "./components/Student_Prof/ProfileScreen.js";
import HomeScreen from "./components/home_screen/Home.component";
import MSViewStudentScreen from "./components/ms_student_screen/MSViewStudentScreen.js";
import MSEditStudentScreen from "./components/ms_student_screen/MSEditStudentScreen.js";
import ViewStudentScreen from './components/student_screens/ViewStudentScreen.js';
import EditStudentScreen from './components/student_screens/EditStudentScreen.js';
import AuthService from './services/auth.service';


class App extends Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showGPDcomponent: false,
      showStudentcomponent: false,
      currentUser: undefined,
      setpath: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showGPDcomponent: user.roles.includes("gpd"),
        showStudentcomponent: user.roles.includes("student"),
        setpath: "/"+user.roles
      });
    }
  }

  logOut() {
    AuthService.logout();
  }






  render() {
    const { currentUser, showGPDcomponent, showStudentcomponent, setpath } = this.state;

    return (
      <div className="App">

        <nav id="navbar" className="banner">
          <div class="container">
            <b class="brand-logo">MAST</b>
            <div className="nav-wrapper">
              <div id="nav-mobile" className="right">
                {/* <li>
                  <Link to={"/"} className="navBarButtons">
                    Home
                  </Link>
                </li> */}

                
                {showGPDcomponent && (
                  <Link to={"/gpd"} className="navBarButtons">
                    TASK
                  </Link>
                )}
{/* 
                //it's for testing.
                {currentUser && (
                  <Link to={"/profile"} className="navBarButtons">
                    Profile
                  </Link>
                )} */}
                
                {showStudentcomponent && currentUser && (
                  <Link to={"/student"} className="navBarButtons">
                    Profile
                  </Link>
                )}            

                {currentUser ? (
                    <a href="/" className="navBarButtons" onClick={this.logOut}>
                      LogOut
                    </a>
                ) : (
                    <Link to={"/login"} className="navBarButtons">
                      Login
                    </Link>
                )}    
              </div>
            </div>       
          </div>          
        </nav>  
          
            <div>
              <Switch>
              {/* <Route exact path="/">
                {currentUser ? <Redirect to={setpath} /> : <LoginScreen />}
              </Route> */}

                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/gpd" component={GPDHomeScreen} />
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/addStudent" component={AddStudentScreen} />
                <Route exact path="/viewStudent" component={ViewStudentScreen} />
                <Route exact path="/editStudent" component={EditStudentScreen} />
                <Route exact path="/student" component={MSViewStudentScreen} /> 
                <Route exact path="/student/edit" component={MSEditStudentScreen} /> 
              </Switch>
            </div>
       </div>
    );
  }
}
export  default App;