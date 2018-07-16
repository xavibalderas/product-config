import React, { Component } from 'react';
import './App.css';
import Header from './modules/Header';
import Configurator from './modules/Configurator';
import Rightpanel from './modules/Rightpanel';

var nav = [
  {label: 'Info', path: '/'},
]

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

                <div class="bars">
                    bars
                </div>

                <div class="envelope">
                    envelope
                </div>

                <div class="shoppingcart">
                    shopping-cart
                </div>

            </div>

      </div>
    );
  }
}


export default App;
