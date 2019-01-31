import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Header , Grid, Segment, Item} from 'semantic-ui-react'

const mapStateToProps = (state) => ({
  selectedCombination: state.data.selectedCombination
});

const _calculateServicePrice = (combination, products) => {

  let _v =  combination.reduce((accumulator, currentValue) => {
    let price = accumulator;
    let i_price = 0;
    console.log(currentValue);
    if (currentValue.isValid && products.hasOwnProperty(currentValue.itemno)){
      i_price = products[currentValue.itemno].RetailItemCommPriceList.RetailItemCommPrice.Price * currentValue.qty;
    }
    return price + i_price;
  }, 0);
  let price = "99.-";

  if (_v < 150){
      price = '49.-';
  }else if (_v >=150 && _v < 1500) {
    price = "69.-";
  }
  return price;


}

class Services extends Component {

  constructor(props) {
    super(props);
  }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){
    console.log(this.state);
    console.log(this.state);
    const _p = _calculateServicePrice(this.props.combination, this.props.products)
    return(
      <Item>
        <Item.Image size='tiny' src='/images/delivery.jpg' />
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


const  ServicesContainer =  connect(mapStateToProps)(Services);
export default ServicesContainer
