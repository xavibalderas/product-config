
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
  console.log(price);
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
            <h3>{_p}</h3>
            <strong>Expresslieferung +20.-</strong>
            <small>Wenn du nur ca. 30 Min. Fahrzeit von IKEA entfernt wohnst, können wir dir deine Einkäufe innerhalb von <strong>48 Stunden</strong> als Expresslieferung zu dir bringen.</small>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}


const  TransportComponent =  connect(mapStateToProps)(Transport);
export default TransportComponent
