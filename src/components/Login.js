import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';


const mapStateToProps = (state) => ({
  loggedIn: state.settings.loggedIn
});

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.combination = {
      actual: "",
      access: '1'
    }
  }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){
    return(
      <div>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: bool => dispatch(actions.logInOut(bool))
  }
}

const  LogInContainer =  connect(mapStateToProps, mapDispatchToProps)(LogIn);
export default LogInContainer
