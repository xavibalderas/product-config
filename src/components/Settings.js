import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import { Input, Form } from 'semantic-ui-react'


class Settings extends Component {
  constructor(props){
    super(props);
    this.products = props.products;
  }
  save() {
    console.log(this.products);
    console.log("Vamos a guardar");
    this.props.saveConfig(this.products);
    localStorage.setItem('products', JSON.stringify(this.products));

  }

  handleChange = (e, {key, name, value}) => {
      if (typeof this.products[name] !== undefined ) {
        this.products[name] = value
      }
  }

  render() {
    console.log(this.props);
    return(
      <div className="Header">
        <h2>Configuration</h2>
        <Form>
        {this.props.products.map((product, index)=>{
          return <Form.Input key={index} name={index} action={{ color: 'teal', labelPosition: 'right', icon: 'plus'}}  onChange={this.handleChange} placeholder={product}/>
        })}
        <Form.Button onClick={() => this.save()}>Save</Form.Button>
          <Form.Button onClick={() => this.props.onLogOut()}>Log out</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    products: state.settings.products
});

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.logInOut(false));
      dispatch(actions.accessSetup(false))
    },
    saveConfig: (products) => {
      console.log("Guardo");
      console.log(products);
      dispatch(actions.saveConfig(products))
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
