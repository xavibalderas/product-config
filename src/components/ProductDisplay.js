import React from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import LogInContainer from './Login.js';
import SettingsButton from './SettingsButton.js';


const mapStateToProps = (state) => ({
  combination: state.settings.combination,
  accessSetup: state.settings.accessSetup
});

const ProductDisplay = ({combination, accessSetup, onAccessSetup}) => (

            <div className="Header">
              <h2>Product display</h2>
              {console.log(combination)}
              <p>{combination.test}</p>
              <button
              onClick={() => onAccessSetup(true)}
              >jjj</button>
              { accessSetup ? <LogInContainer/> : <SettingsButton/>}
            </div>
);
const mapDispatchToProps = dispatch => {
  return {
    onAccessSetup: bool => dispatch(actions.accessSetup(bool))
  }
}

 const  ProductDisplayList =  connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
 export default ProductDisplayList
