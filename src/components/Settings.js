import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import { Input, Form } from 'semantic-ui-react'


class Settings extends Component {
  constructor(props){
    super(props);
  }
  save() {
    console.log(this.props);
  }
  render() {
    return(
      <div className="Header">
        <h2>Configuration</h2>
        <Form>
        {this.props.products.map((product, index)=>{
          return <Form.Input key={index} action={{ color: 'teal', labelPosition: 'right', icon: 'plus'}} placeholder={product}/>
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
    }
  }
}

const  SettingsContainer =  connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContainer
