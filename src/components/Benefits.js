
import React, { Component } from 'react';
import {Item} from 'semantic-ui-react'
import { connect } from 'react-redux';
import './Benefits.css';


const mapStateToProps = (state) => ({
  config: state.settings.config
});


class BenefitsController extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const _new = this.props.config.new;
    const _guarantee = this.props.config.guarantee;
    return(
      <div id="product-benefits">
      {
          _new &&
          <div className="new_logo"><img src="/images/new.png" /></div>
      }
      {
          _guarantee &&
          <div className="new_logo"><img src="/images/guarantee.png" /></div>
      }

      </div>
    );
  }
}

const  Benefits =  connect(mapStateToProps)(BenefitsController);

export default Benefits
