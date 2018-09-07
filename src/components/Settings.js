import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Input, Form ,Radio, Button, Icon, Table, Grid, Card} from 'semantic-ui-react'

class Settings extends Component {
  constructor(props){
    super(props);
    this.combinations = props.combinations;
    this.state = {
      combinations: props.combinations
    }
  }
  save() {
    this.props.saveConfig(this.state.combinations);
    this.props.selectCombination(0);
    localStorage.setItem('products', JSON.stringify(this.state.combinations));

  }

  handleChange = (e, data) => {
    const pro = this.state.combinations.slice();
      if (typeof pro[data.data_index] !== undefined ) {
        pro[data.data_index][data.data_article][data.name] = data.value;
        this.setState({
          combinations: pro
        })
      }
  }

  addCombination = () =>{
    this.setState({
      combinations: this.state.combinations.concat([
        {
          bed:'',
          mattress: '',
          mattress_qty: 1,
          slat: '',
          slat_qty: 1,
          extra: '',
          extra_qty: 0
        }
      ])
    });
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
    dup_array[index].push({itemno:'', qty:0});
    this.setState({combinations: dup_array});
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
                  value = {article.itemno} />
                  <Input
                  name = 'qty'
                  data_article = {i}
                  data_index = {index}
                  onChange = {this.handleChange}
                  placeholder = 'Quantity'
                  value = {article.qty} />
                </Card.Content>
                );
              })}

              <Card.Content extra>
                <Button content='Add article' onClick={() => this.addArticle(index)}/>
              </Card.Content>
            </Card>
          )
        })}
        </Card.Group>
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
    saveConfig: (combinations) => {
      dispatch(actions.saveConfig(combinations));
      dispatch(actions.configLoaded(combinations));
      dispatch(actions.itemsLoaded(combinations));
    },
    selectCombination: (combination) => {
      dispatch(actions.selectCombination(combination));
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
