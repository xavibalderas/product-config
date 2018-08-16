import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';


const mapStateToProps = (state) => ({
  loggedIn: state.settings.loggedIn
});


const LogIn = ({loggedIn, onLogIn}) => (
  <div>
    <button onClick={()=>onLogIn(true)}>Log in</button>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: bool => dispatch(actions.logInOut(bool))
  }
}

const  LogInContainer =  connect(mapStateToProps, mapDispatchToProps)(LogIn);
export default LogInContainer
