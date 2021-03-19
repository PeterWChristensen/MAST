import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Import Components
import GPDHomeScreen from './components/home_screen/GPDHomeScreen.js';
import Navbar from './components/navbar/Navbar.js';

class App extends Component{
  render() {
    return (
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={GPDHomeScreen} />
              </Switch>
            </div>
          </BrowserRouter>
    );
  }
}
export  default App;
