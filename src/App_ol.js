import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './App.css';
import Header from './modules/Header';
import Configurator from './modules/Configurator';
import Rightpanel from './modules/Rightpanel';
import Leftpanel from './modules/Leftpanel';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div className="mainscreenlandscape">
        <div>
                <Header />

                <Configurator />

                <div class="logo">
                    <img src={ require('./img/main-screen-landscape-ikealogo@2x.png')} alt="" class="ikealogo" />
                </div>

                <Rightpanel />

                <Leftpanel />



            </div>
      </div>
      );
  }
}


export default App;
