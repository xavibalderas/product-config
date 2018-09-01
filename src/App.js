import React, { Component } from 'react';
import './App.css';
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
    const combinations = localStorage.getItem('products');
    if (combinations){
      const v_products = JSON.parse(combinations);
      if (v_products.length > 0){
        console.log(v_products);
        this.props.configLoaded(v_products);
        this.props.itemsLoaded(v_products);
      }

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
    configLoaded: (combinations) => dispatch(actions.configLoaded(combinations)),
    itemsLoaded: (combinations) => dispatch(actions.itemsLoaded(combinations))
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default App
