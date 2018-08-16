import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Configurator from './components/Configurator';
import SettingsContainer from './components/Settings';
import ProductDisplayList from './components/ProductDisplay';
import { connect } from 'react-redux';
import { actions } from './store/actions';
import { Container } from 'semantic-ui-react'



class RootContainer extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.isFetchingSettings(true);
    const products = localStorage.getItem('products');
    if (products){
      this.props.configLoaded(products);
    }
    this.props.isFetchingSettings(false);
  }
  render(){
    return (
      <Container>
        { this.props.loggedIn ? <SettingsContainer/> : <ProductDisplayList/>}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.settings.loggedIn
});

const mapDispatchToProps = dispatch => {
  return {
    isFetchingSettings: (bool) => dispatch(actions.loadingConfig(bool)),
    configLoaded: (products) => dispatch(actions.configLoaded(products))
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default App
