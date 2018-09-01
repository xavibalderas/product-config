import React from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import { Button } from 'semantic-ui-react';
import './SettingsButton.css';


const SettingsButton = ({onAccessSetup}) => (
  <div class="settings-button">
    <Button
    onClick={() => onAccessSetup(true)}
    >Log In</Button>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onAccessSetup: bool => dispatch(actions.accessSetup(bool))
  }
}

const  SettingsButtonContainer =  connect(null, mapDispatchToProps)(SettingsButton);
export default SettingsButtonContainer
