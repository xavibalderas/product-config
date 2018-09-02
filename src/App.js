import React, { Component } from 'react';
import './App.css';
import SettingsContainer from './components/Settings';
import DisplayContainer from './components/DisplayContainer';
import { connect } from 'react-redux';
import { actions } from './store/actions';
import { Container } from 'semantic-ui-react'



class RootContainer extends Component{

  componentDidMount(){
    this.props.isFetchingSettings(true);
    const combinations = localStorage.getItem('products');
    if (combinations){
      const v_products = JSON.parse(combinations);
      if (v_products.length > 0){
        this.props.configLoaded(v_products);
        this.props.itemsLoaded(v_products);
        this.props.selectCombination(0);
      }

    }
    this.props.isFetchingSettings(false);
  }
  render(){
    return (
      <Container fluid>
        { this.props.loggedIn ? <SettingsContainer/> : <DisplayContainer/>}
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
    itemsLoaded: (combinations) => dispatch(actions.itemsLoaded(combinations)),
    selectCombination: (combination) => {dispatch(actions.selectCombination(combination))
    }
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default App
