import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { Item} from 'semantic-ui-react'

import TransportComponent from './TransportComponent'
import PickComponent from './PickComponent'
import AssemblycontComponent from './AssemblycontComponent'
import AssemblyComponent from './AssemblyComponent'

const mapStateToProps = (state) => ({
  selectedCombination: state.data.selectedCombination,
  services: state.settings.config.services
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

  return _v;
}

class Services extends Component {



  constructor(props) {
    super(props);
    console.log(this.props.services);
  }
  _components =  {
        TransportComponent: TransportComponent,
        PickComponent: PickComponent,
        AssemblycontComponent: AssemblycontComponent,
        AssemblyComponent: AssemblyComponent
    }

  resetCombination(){
    console.log(this.combination);
    this.combination.actual="";
  }

  render(){

    const _services = this.props.services == undefined ?  ['TransportComponent'] : this.props.services;
    const price = _calculateServicePrice(this.props.combination, this.props.products);
    //settings.config.services = settings.config.services== undefined ? ['TransportComponent'] : action.settings.services;
    
    return(
      <Item.Group>
      {_services.map((service)=>{
        let FakeComponent =this._components[service];
        return(
          <FakeComponent key = {service} price={price}/>
      );})}
        </Item.Group>


    );
  }
}


const  ServicesContainer =  connect(mapStateToProps)(Services);
export default ServicesContainer
