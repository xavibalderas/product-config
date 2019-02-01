
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Header , Grid, Segment, Item} from 'semantic-ui-react'


const mapStateToProps = (state) => ({
  selectedCombination: state.data.selectedCombination,
  services: state.settings.config.services
});

const _calculateServicePrice = (price) => {
  let _p = "99.-";

  if (price < 150){
      _p = '49.-';
  }else if (price >=150 && price < 1500) {
    _p = "69.-";
  }
  return _p;
}

class Transport extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.services);
  }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){
    const _p = _calculateServicePrice(this.props.price)

    return(
      <Item >
        <Item.Image size='tiny' src='/images/delivery.png' />
        <Item.Content>
          <Item.Header as='a'>Lieferservice</Item.Header>
          <Item.Description>
            {_p}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}


const  TransportComponent =  connect(mapStateToProps)(Transport);
export default TransportComponent
