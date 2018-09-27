import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Input, Form ,Radio, Button, Icon, Table, Grid, Card} from 'semantic-ui-react';
import queryReducer from '../tools/queryReducer';

class Settings extends Component {
  constructor(props){
    super(props);
    this.combinations = props.combinations;
    this.state = {
      combinations: props.combinations,
      version: '1.0',
      config: {}
    }
  }
  save() {
    this.props.saveConfig(this.state);
    this.props.selectCombination(0);
    alert("Saved");
    //localStorage.setItem('settings', JSON.stringify(this.state.combinations));

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

  render() {
    return(
      <div>
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

      </div>
    )
  }
}

const mapStateToProps = state => ({
    combinations: state.settings.combinations
});

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.logInOut(false));
      dispatch(actions.accessSetup(false))
    },
    saveConfig: (settings) => {
      dispatch(actions.saveConfig(settings.combinations));
      dispatch(actions.configLoaded(settings.combinations));
      dispatch(actions.itemsLoaded(settings.combinations));
      dispatch(actions.settingsLoaded(settings.config));
      localStorage.setItem('settings', JSON.stringify(settings));
    },
    selectCombination: (combination) => {
      dispatch(actions.selectCombination(combination));
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
