import React from 'react';
import { connect } from 'react-redux';
import { actions, TYPES } from '../store/actions';
import LogInContainer from './Login.js';
import SettingsButtonContainer from './SettingsButton.js';
import { Loader} from 'semantic-ui-react'



const mapStateToProps = (state) => ({
  accessSetup: state.settings.accessSetup,
  isFetching: state.settings.isFetching
});

const ProductDisplay = ({accessSetup, isFetching}) => (

            <div className="Header">
              <h2>Product display</h2>
              <p></p>
              { accessSetup ? <LogInContainer/> : <SettingsButtonContainer/> }
              { isFetching ? <Loader active/> : null }
            </div>
);

 const  ProductDisplayList =  connect(mapStateToProps)(ProductDisplay);
 export default ProductDisplayList
