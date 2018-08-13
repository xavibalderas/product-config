import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Header from './modules/Header';
import Configurator from './modules/Configurator';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Header}/>
          <Route path="/about" component={Configurator}/>
        </div>
      </Router>
      );
  }
}


export default App;
