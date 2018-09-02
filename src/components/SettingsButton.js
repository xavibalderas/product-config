import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Button, Modal } from 'semantic-ui-react';
import './SettingsButton.css';


class SettingsButton extends React.Component{

  constructor(props){
    super(props);
    this.state= {modalOpen:false};
    this.combination = {
      actual: "",
      access: process.env.REACT_APP_SETTINGS_PASSWORD
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });

  resetCombination= () => {
    console.log(this.combination);
    this.combination.actual="";
  };

  render(){
    return(
      <Modal
      trigger={<Button className = "settings-button" onClick={this.handleOpen} ></Button>}
      >
         <Modal.Header>Log In</Modal.Header>
         <Modal.Content image>
         <button onClick={() => this.combination.actual === this.combination.access ? this.props.onLogIn(true) : this.resetCombination() }>Log in</button>
         <button onClick={() => this.combination.actual+="1" }>1</button>
         <button onClick={() => this.combination.actual+="2" }>2</button>
         <button onClick={() => this.combination.actual+="3" }>3</button>
         <button onClick={() => this.combination.actual+="4" }>4</button>
         <button onClick={() => this.combination.actual+="5" }>5</button>
         <button onClick={() => this.combination.actual+="6" }>6</button>
         <button onClick={() => this.combination.actual+="7" }>7</button>
         <button onClick={() => this.combination.actual+="8" }>8</button>
         <button onClick={() => this.combination.actual+="9" }>9</button>
         <button onClick={() => this.combination.actual+="0" }>0</button>
         </Modal.Content>
       </Modal>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAccessSetup: bool => dispatch(actions.accessSetup(bool)),
    onLogIn: bool => dispatch(actions.logInOut(bool))
  }
}

const  SettingsButtonContainer =  connect(null, mapDispatchToProps)(SettingsButton);
export default SettingsButtonContainer
