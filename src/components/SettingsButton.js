import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Button, Modal, Segment } from 'semantic-ui-react';
import './SettingsButton.css';


class SettingsButton extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      modalOpen:false,
      combination: '',
      access: process.env.REACT_APP_SETTINGS_PASSWORD
    };
  };

  handleOpen = () => this.setState({ modalOpen: true });

  resetCombination= () => {
    this.setState({combination: ''});
  };

  render(){
    const com = this.state.combination;
    const acc = this.state.access;

    return(
      <Modal
      trigger={<Button className = "settings-button" onClick={this.handleOpen} ></Button>}
      >
         <Modal.Header>Log In</Modal.Header>
         <Modal.Content>
         <h2>{this.state.combination}</h2>
         <Segment basic>
          <Button onClick={() => com === acc ? this.props.onLogIn(true) : this.resetCombination() }>Log in</Button><br/>
         </Segment>
         <Segment basic>
         <Button onClick={() => this.setState({combination: this.state.combination + '1'})}>1</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '2'})}>2</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '3'})}>3</Button>
         </Segment>
        <Segment basic>
         <Button onClick={() => this.setState({combination: this.state.combination + '4'})}>4</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '5'})}>5</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '6'})}>6</Button>
         </Segment>
         <Segment basic>
         <Button onClick={() => this.setState({combination: this.state.combination + '7'})}>7</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '8'})}>8</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '9'})}>9</Button>
         <Button onClick={() => this.setState({combination: this.state.combination + '0'})}>0</Button>
         </Segment>
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
