import React, { Component } from 'react';
import './App.css';
import SettingsContainer from './components/Settings';
import DisplayContainer from './components/DisplayContainer';
import { connect } from 'react-redux';
import { actions } from './store/actions';
import { Container } from 'semantic-ui-react'
import queryReducer from './tools/queryReducer';
import ReactGA from 'react-ga';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";

const GET_SETTINGS = gql`
query display($display: String!) {
  combinations(
    first: 1,
    orderBy: updatedAt_DESC,
    where: {
      display: $display
    }
  ){
    settings
  }
}
`;


//import updater from '../tools/update';

function initializeReactGA(display) {
    ReactGA.initialize('UA-125590444-2');
    ReactGA.pageview(display);
}



class RootContainer extends Component{

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  storageAvailable() {
      try {
          var storage = window['localStorage'],
              x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
      }
      catch(e) {
          return e instanceof DOMException && (
              // everything except Firefox
              e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === 'QuotaExceededError' ||
              // Firefox
              e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
              // acknowledge QuotaExceededError only if there's something already stored
              storage.length !== 0;
      }
  };

  componentDidMount(){
    const { cookies } = this.props;
    this.props.isFetchingSettings(true);
    //this.updateOldSettings();
    //const settings = localStorage.getItem('settings');
    var displayID = '';
    if (this.storageAvailable()){
      displayID = localStorage.getItem('displayID');
    }else {
      displayID = cookies.get('displayID');
    }

    if (displayID !== ''){
      this.loadRemoteSettings(displayID);
    }
    console.log(displayID);
    initializeReactGA(displayID);
    //
    // if (settings){
    //
    //   const v_settings = JSON.parse(settings);//settings; //JSON.parse(settings);
    //
    //   this.props.settingsLoaded(v_settings.config);
    //   if (v_settings.combinations.length > 0){
    //     this.props.configLoaded(v_settings.combinations);
    //     this.props.itemsLoaded(v_settings.combinations);
    //     this.props.selectCombination(0);
    //   }
    //
    // }
    // this.props.isFetchingSettings(false);
  }

  loadRemoteSettings(id){

    const client = new ApolloClient({
          //uri: 'https://graphqlserver-productsinfo.herokuapp.com/'
          uri: 'https://api-euwest.graphcms.com/v1/cjj5tfbui004n01g883gezq5k/master'
          //uri: URI_API
    });
    console.log(client);
    client.query({
      query: GET_SETTINGS,
      variables: {
        display: id
      }
    }).then((result) => {
        const _c = result.data.combinations;
        if (result.data.combinations.length > 0){
          const _d = _c[0];
          const settings = _d.settings;
          
          this.props.settingsLoaded(settings.config);
          if (settings.combinations.length > 0){
            this.props.configLoaded(settings.combinations);
            this.props.itemsLoaded(settings.combinations);
            this.props.selectCombination(0);
          }
          this.props.isFetchingSettings(false);
        }

    })
      .catch(error => { console.log(error) });
  }


  updateOldSettings(){
    const combinations = localStorage.getItem('products');
    if (combinations){
      //We are in the old system, now the data is saved under "settings";
      const v_products = JSON.parse(combinations);
      if (v_products.length > 0){
        let n_list = v_products.map((item, key)=>{
          let _r = [];
          if (queryReducer.isValidItem(item.bed)){
            _r.push({
              itemno: item.bed.toUpperCase(),
              qty: 1,
              isValid: true
            })
          };
          if (queryReducer.isValidItem(item.mattress)){
            _r.push({
              itemno: item.mattress.toUpperCase(),
              qty: item.mattress_qty,
              isValid: true
            })
          };
          if (queryReducer.isValidItem(item.slat)){
            _r.push({
              itemno: item.slat.toUpperCase(),
              qty: item.slat_qty,
              isValid: true
            })
          };
          if (queryReducer.isValidItem(item.extra)){
            _r.push({
              itemno: item.extra.toUpperCase(),
              qty: item.extra_qty,
              isValid: true
            })
          };
          return _r;
        });
        let nu = {
          combinations: n_list,
          version: '1.0',
          config: {}
        }
        localStorage.setItem('settings', JSON.stringify(nu));
        localStorage.removeItem('products')
      }
    }
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
    selectCombination: (combination) => dispatch(actions.selectCombination(combination)),
    settingsLoaded: (settings) => dispatch(actions.settingsLoaded(settings))
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default withCookies(App);
