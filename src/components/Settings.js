import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Input, Form ,Radio, Button, Icon, Table, Grid, Card} from 'semantic-ui-react';
import queryReducer from '../tools/queryReducer';
import { withCookies } from 'react-cookie';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
const ADD_SETTINGS = gql`
  mutation createCombination($data: CombinationCreateInput!) {
    createCombination(data: $data) {
      id
    }
  }
`;

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

class Settings extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.combinations = props.combinations;
    this.state = {
      combinations: props.combinations,
      version: '1.0',
      config: {
        displayID: props.displayID
      }
    }
  }

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
}

  save() {
    this.props.saveConfig(this.state);
    this.props.selectCombination(0);
    if(this.storageAvailable()){
      localStorage.setItem('displayID', this.state.config.displayID);
    }else {
      this.props.cookies.set('displayID', this.state.config.displayID);
    }

    console.log(this.state);
    alert("Saved");
//    localStorage.setItem('settings', JSON.stringify(this.state));
    this.uploadSettings(this.state);

  }

  uploadSettings= (settings) =>{
    const client = new ApolloClient({
          //uri: 'https://graphqlserver-productsinfo.herokuapp.com/'
          uri: 'https://api-euwest.graphcms.com/v1/cjj5tfbui004n01g883gezq5k/master'
          //uri: URI_API
    });
    console.log(client);
    client.mutate({
      mutation: ADD_SETTINGS,
      variables: {
        data: {
          display: this.state.config.displayID,
          settings: settings
        }
      }
    }).then(result => { console.log(result) })
      .catch(error => { console.log(error) });
  }

  handleChange = (e, data) => {
    const pro = this.state.combinations.slice();
      if (typeof pro[data.data_index] !== undefined ) {
        pro[data.data_index][data.data_article][data.name] = data.value;
        if (data.name === 'itemno'){
          pro[data.data_index][data.data_article].isValid = queryReducer.isValidItem(data.value);
        }
        this.setState({
          combinations: pro
        })
      }
  }

  handleChangeID = (e, data) => {
    console.log(data.value);
        this.setState({
          config:{
              displayID:  data.value
          }
        })

  }

  addCombination = () =>{
    this.setState({
      combinations: this.state.combinations.concat([[
        {
          itemno:'',
          qty: 1,
          isValid: false
        }
      ]])
    });
    console.log(this.state.combinations);
  }

  removeCombination = (name) => {
    const pro = this.state.combinations.slice();
      if (typeof pro[name] !== undefined ) {
        pro.splice(name,1);
        this.setState({
          combinations: pro
        })
      }
  }

  addArticle = (index) => {
    var dup_array = this.state.combinations.slice();
    dup_array[index].push({itemno:'', qty: 1, isValid: false});
    this.setState({combinations: dup_array});
  }

  removeArticle = (combination, article) => {
    var dup_array = this.state.combinations.slice();
    dup_array[combination].splice(article, 1);
    this.setState({combinations: dup_array});
  }
  removeCombination = (combination) => {
    var _comb = this.state.combinations;
    _comb.splice(combination, 1);
    this.setState({combinations: _comb});

  }

  loadConfig = () => {
    console.log(this.state);
    const client = new ApolloClient({
          //uri: 'https://graphqlserver-productsinfo.herokuapp.com/'
          uri: 'https://api-euwest.graphcms.com/v1/cjj5tfbui004n01g883gezq5k/master'
          //uri: URI_API
    });
    console.log(client);
    client.query({
      query: GET_SETTINGS,
      variables: {
        display: this.state.config.displayID
      }
    }).then((result) => {
        const _c = result.data.combinations;
        if (result.data.combinations.length > 0){
          const _d = _c[0];
          const settings = _d.settings;
          console.log(settings);
          //this.props.settingsLoaded(settings.config);
          if (settings.combinations.length > 0){
            this.setState({combinations: settings.combinations});
            console.log(this.props);
            console.log(this.state);
          }
        }

    })
      .catch(error => { console.log(error) });
  }

  render() {
    console.log(this.state);
    return(
      <div>
      <Input
      name = 'displayId'
      onChange = {this.handleChangeID}
      placeholder = 'Product Number'
      value = {this.state.config.displayID}
       />
        <Card.Group>
        {this.state.combinations.map((combination, index)=>{
          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header>Combination {index}</Card.Header>
              </Card.Content>

              {combination.map((article, i)=>{
                return (
                <Card.Content key = {i}>
                  <Input
                  name = 'itemno'
                  data_article = {i}
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = 'Product Number'
                  value = {article.itemno}
                  error = {!article.isValid} />
                  <Input
                  name = 'qty'
                  data_article = {i}
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = 'Quantity'
                  value = {article.qty} />
                  <Button content='Remove Article' onClick={() => this.removeArticle(index, i)}/>
                </Card.Content>
                );
              })}

              <Card.Content extra>
                <Button content='Add article' onClick={() => this.addArticle(index)}/>
                <Button content='Remove Combination' onClick={() => this.removeCombination(index)}/>
              </Card.Content>
            </Card>
          )
        })}
        </Card.Group>
        <Button content='Add Combination' onClick={() => this.addCombination()}/>
        <Button onClick={() => this.save()}>Save</Button>
        <Button onClick={() => this.props.onLogOut()}>Log out</Button>
        <Button content='Load config' onClick={() => this.loadConfig()}/>


      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    combinations: state.settings.combinations,
    displayID: state.settings.config.displayID,
    cookies: ownProps.cookies
});

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.logInOut(false));
      dispatch(actions.accessSetup(false))
    },
    saveConfig: (settings) => {
      dispatch(actions.saveConfig(settings.combinations));
      dispatch(actions.saveSettings(settings.config));
      dispatch(actions.configLoaded(settings.combinations));
      dispatch(actions.itemsLoaded(settings.combinations));
      dispatch(actions.settingsLoaded(settings.config));
    //  localStorage.setItem('settings', JSON.stringify(settings));
    },
    selectCombination: (combination) => {
      dispatch(actions.selectCombination(combination));
    },
    configLoaded: (combinations) => dispatch(actions.configLoaded(combinations)),
    settingsLoaded: (settings) => dispatch(actions.settingsLoaded(settings)),
    itemsLoaded: (combinations) => dispatch(actions.itemsLoaded(combinations)),

  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default withCookies(SettingsContainer);
