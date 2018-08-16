import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Configurator from './components/Configurator';
import Settings from './components/Settings';
import ProductDisplayList from './components/ProductDisplay';
import { connect } from 'react-redux';
import { actions } from './store/actions'

const mapStateToProps = (state) => ({
  loggedIn: state.settings.loggedIn
});

const RootContainer = ({loggedIn, dispatch}) => (

      <div>

        { loggedIn ? <Settings/> : <ProductDisplayList/>}

      </div>
);

const App = connect(mapStateToProps)(RootContainer);
export default App
